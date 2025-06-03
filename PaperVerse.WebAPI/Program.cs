using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PaperVerse.Core.Interfaces;                         // IUserRepository, IRefreshTokenRepository, IUnitOfWork
using PaperVerse.Infrastructure.Data.Context;             // PaperVerseDbContext
using PaperVerse.Infrastructure.Persistence;              // UnitOfWork
using PaperVerse.Infrastructure.Repositories;             // UserRepository, RefreshTokenRepository
using PaperVerse.Infrastructure.Services;                 // AuthenticationService
using PaperVerse.Application.Interfaces;                  // IUserService, IAuthService, IAccountService, IUserManagementService, IAuthenticationService
using PaperVerse.Application.UseCases.Authentication;      // RegisterUseCase, LoginUseCase, AccountManagementUseCase
using PaperVerse.Application.UseCases.Users;               // UserManagementUseCase
using PaperVerse.WebAPI.Mappings;                          // WebApiAutoMapperProfile
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1) Чтение конфигурации
var configuration = builder.Configuration;

// 2) Разрешаем CORS для React (примерно http://localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
          .WithOrigins("http://localhost:3000")   // Адрес React-приложения
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
    });
});

// 3) DbContext
builder.Services.AddDbContext<PaperVerseDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// 4) AutoMapper
builder.Services.AddAutoMapper(typeof(WebApiAutoMapperProfile).Assembly);

// 5) Репозитории и UnitOfWork
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// 6) Сервисы аутентификации и use case’ы
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserService, RegisterUseCase>();
builder.Services.AddScoped<IAuthService, LoginUseCase>();
builder.Services.AddScoped<IAccountService, AccountManagementUseCase>();
builder.Services.AddScoped<IUserManagementService, UserManagementUseCase>();

// 7) JWT‐аутентификация
var jwtKey = configuration["Jwt:Key"]
               ?? throw new InvalidOperationException("JWT Key is not configured");
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 8) Включаем CORS перед UseRouting и UseEndpoints
app.UseCors("AllowReactApp");

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
