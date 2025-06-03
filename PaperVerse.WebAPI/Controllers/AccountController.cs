using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;

namespace PaperVerse.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(
            IAccountService accountService,
            IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        // GET: /api/v1/account/profile
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userDto = await _accountService.GetCurrentUserAsync(User);
                return Ok(new
                {
                    fullName = userDto.FullName,
                    userName = userDto.UserName,
                    email = userDto.Email,
                    role = userDto.Role
                });
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
