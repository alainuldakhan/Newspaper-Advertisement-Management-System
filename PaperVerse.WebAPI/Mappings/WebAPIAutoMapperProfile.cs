using AutoMapper;
using PaperVerse.WebAPI.Models;              
using PaperVerse.Application.DTO_s;           

namespace PaperVerse.WebAPI.Mappings
{
    public class WebApiAutoMapperProfile : Profile
    {
        public WebApiAutoMapperProfile()
        {
            CreateMap<RegisterModel, RegisterRequest>();
            CreateMap<LoginModel, LoginRequest>();

            // CreateMap<LoginResponse, SomeResponseModel>();
        }
    }
}
