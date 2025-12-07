using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.DTOs;
using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryDbContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(LibraryDbContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookResponseDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookResponseDto>>> GetBooks()
        {
            try
            {
                var books = await _context.Books
                    .Include(b => b.User)
                    .Select(b => new BookResponseDto
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        Description = b.Description,
                        CreatedAt = b.CreatedAt,
                        UpdatedAt = b.UpdatedAt,
                        UserId = b.UserId,
                        Username = b.User != null ? b.User.Username : null
                    })
                    .ToListAsync();

                _logger.LogInformation("Retrieved {Count} books", books.Count);
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving books");
                return StatusCode(500, new { message = "An error occurred while retrieving books" });
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookResponseDto>> GetBook(int id)
        {
            try
            {
                var book = await _context.Books
                    .Include(b => b.User)
                    .Where(b => b.Id == id)
                    .Select(b => new BookResponseDto
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        Description = b.Description,
                        CreatedAt = b.CreatedAt,
                        UpdatedAt = b.UpdatedAt,
                        UserId = b.UserId,
                        Username = b.User != null ? b.User.Username : null
                    })
                    .FirstOrDefaultAsync();

                if (book == null)
                {
                    _logger.LogWarning("Book with ID {Id} not found", id);
                    return NotFound(new { message = $"Book with ID {id} not found" });
                }

                _logger.LogInformation("Retrieved book with ID {Id}", id);
                return Ok(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving book with ID {Id}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the book" });
            }
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<BookResponseDto>> CreateBook([FromBody] BookCreateDto bookDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                int? userId = userIdClaim != null ? int.Parse(userIdClaim.Value) : null;

                var book = new Book
                {
                    Title = bookDto.Title,
                    Author = bookDto.Author,
                    Description = bookDto.Description,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                var createdBook = await _context.Books
                    .Include(b => b.User)
                    .Where(b => b.Id == book.Id)
                    .Select(b => new BookResponseDto
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        Description = b.Description,
                        CreatedAt = b.CreatedAt,
                        UpdatedAt = b.UpdatedAt,
                        UserId = b.UserId,
                        Username = b.User != null ? b.User.Username : null
                    })
                    .FirstAsync();

                _logger.LogInformation("Created book with ID {Id}", book.Id);
                return CreatedAtAction(nameof(GetBook), new { id = book.Id }, createdBook);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating book");
                return StatusCode(500, new { message = "An error occurred while creating the book" });
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookUpdateDto bookDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning("Book with ID {Id} not found for update", id);
                    return NotFound(new { message = $"Book with ID {id} not found" });
                }

                book.Title = bookDto.Title;
                book.Author = bookDto.Author;
                book.Description = bookDto.Description;
                book.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Updated book with ID {Id}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating book with ID {Id}", id);
                return StatusCode(500, new { message = "An error occurred while updating the book" });
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning("Book with ID {Id} not found for deletion", id);
                    return NotFound(new { message = $"Book with ID {id} not found" });
                }

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Deleted book with ID {Id}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting book with ID {Id}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the book" });
            }
        }

        [HttpGet("search")]
        [ProducesResponseType(typeof(IEnumerable<BookResponseDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<BookResponseDto>>> SearchBooks([FromQuery] string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query))
                {
                    return BadRequest(new { message = "Search query cannot be empty" });
                }

                var books = await _context.Books
                    .Include(b => b.User)
                    .Where(b => b.Title.Contains(query) || b.Author.Contains(query))
                    .Select(b => new BookResponseDto
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        Description = b.Description,
                        CreatedAt = b.CreatedAt,
                        UpdatedAt = b.UpdatedAt,
                        UserId = b.UserId,
                        Username = b.User != null ? b.User.Username : null
                    })
                    .ToListAsync();

                _logger.LogInformation("Search for '{Query}' returned {Count} results", query, books.Count);
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching books with query '{Query}'", query);
                return StatusCode(500, new { message = "An error occurred while searching for books" });
            }
        }
    }
}
