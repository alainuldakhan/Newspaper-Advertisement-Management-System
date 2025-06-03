using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace PaperVerse.WebAPI.Configuration
{
    /// <summary>
    /// Extension methods to configure authorization policies for PaperVerse.
    /// </summary>
    public static class AuthorizationExtensions
    {
        private static class Roles
        {
            public const string Administrator = "administrator";
            public const string Editor = "editor";
            public const string Advertiser = "advertiser";
        }

        /// <summary>
        /// Adds and configures authorization policies.
        /// - Fallback policy: require authenticated user by default.
        /// - AdminOnly: only administrators.
        /// - EditorOrAdmin: administrators or editors.
        /// </summary>
        public static IServiceCollection AddPaperVerseAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                // Require authenticated user for all endpoints by default
                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                // Only administrators
                options.AddPolicy(PolicyNames.AdminOnly,
                    policy => policy.RequireRole(Roles.Administrator));

                // Administrators or editors
                options.AddPolicy(PolicyNames.EditorOrAdmin,
                    policy => policy.RequireRole(Roles.Administrator, Roles.Editor));
            });

            return services;
        }

        /// <summary>
        /// Defines the policy names used throughout the application.
        /// </summary>
        public static class PolicyNames
        {
            public const string AdminOnly = "AdminOnly";
            public const string EditorOrAdmin = "EditorOrAdmin";
        }
    }
}
