using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;
using PaperVerse.WebAPI.Models;
using System.Security.Claims;

namespace PaperVerse.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;                    // Registration only
        private readonly IUserManagementService _userManagementService; // Admin‐only user CRUD
        private readonly IAuthService _authService;                    // Login, Logout
        private readonly IAccountService _accountService;              // Refresh, Change/Forgot/Reset Password
        private readonly IMapper _mapper;

        public AuthController(
            IUserService userService,
            IUserManagementService userManagementService,
            IAuthService authService,
            IAccountService accountService,
            IMapper mapper)
        {
            _userService = userService;
            _userManagementService = userManagementService;
            _authService = authService;
            _accountService = accountService;
            _mapper = mapper;
        }

        // ===========================================
        // 1. Registration new user
        // ===========================================
        // POST: /api/v1/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var request = _mapper.Map<RegisterRequest>(model);
                var userDto = await _userService.RegisterAsync(request);

                // Note: if GetById is restricted to Admin, consider a separate "GetCurrentUser" endpoint
                return CreatedAtAction(nameof(AdminGetById), new { id = userDto.Id }, userDto);
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  2. Login (get tokens)
        // ===========================================
        // POST: /api/v1/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var request = _mapper.Map<LoginRequest>(model);
                var response = await _authService.LoginAsync(request);

                return Ok(new
                {
                    accessToken = response.AccessToken,
                    refreshToken = response.RefreshToken,
                    expiresAt = response.ExpiresAt,
                    role = response.Role,
                    userName = response.UserName
                });
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  3. Logout (delete refresh-token)
        // ===========================================
        // POST: /api/v1/auth/logout
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _authService.LogoutAsync(model.RefreshToken);
                return NoContent();
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  4. Refresh access token
        // ===========================================
        // POST: /api/v1/auth/refresh-token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var response = await _accountService.RefreshTokenAsync(model.RefreshToken);

                return Ok(new
                {
                    accessToken = response.AccessToken,
                    refreshToken = response.RefreshToken,
                    expiresAt = response.ExpiresAt
                });
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  5. Change current user password
        // ===========================================
        // POST: /api/v1/auth/change-password
        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var request = _mapper.Map<ChangePasswordRequest>(model);
                request.UserId = Guid.Parse(userId);

                await _accountService.ChangePasswordAsync(request);
                return NoContent();
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  6. Recover password (send email with instructions)
        // ===========================================
        // POST: /api/v1/auth/forgot-password
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _accountService.ForgotPasswordAsync(model.Email);
                return Ok(new { message = "If the email is registered, instructions have been sent." });
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  7. Reset password (using token from email)
        // ===========================================
        // POST: /api/v1/auth/reset-password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var request = _mapper.Map<ResetPasswordRequest>(model);
                await _accountService.ResetPasswordAsync(request);
                return NoContent();
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // ===========================================
        //  8. CRUD operations for users (Admin only)
        // ===========================================
        // GET: /api/v1/auth/users
        [HttpGet("users")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AdminGetAllUsers()
        {
            try
            {
                var users = await _userManagementService.GetAllAsync();
                return Ok(users);
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // GET: /api/v1/auth/users/{id}
        [HttpGet("users/{id:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AdminGetById([FromRoute] Guid id)
        {
            try
            {
                var userDto = await _userManagementService.GetByIdAsync(id);
                if (userDto == null)
                    return NotFound(new { message = "User not found." });
                return Ok(userDto);
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // PUT: /api/v1/auth/users/{id}
        [HttpPut("users/{id:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AdminUpdateUser([FromRoute] Guid id, [FromBody] UpdateUserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var request = _mapper.Map<UpdateUserRequest>(model);
                await _userManagementService.UpdateAsync(id, request);
                return NoContent();
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // DELETE: /api/v1/auth/users/{id}
        [HttpDelete("users/{id:guid}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AdminDeleteUser([FromRoute] Guid id)
        {
            try
            {
                await _userManagementService.DeleteAsync(id);
                return NoContent();
            }
            catch (PaperVerse.Application.Exceptions.ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}
