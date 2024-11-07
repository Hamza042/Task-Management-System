using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskManagement.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddColumn1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1d27fff2-fe65-4992-af45-db48cd8efeb4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b399626-cfc3-4d0c-a5aa-49900509d5d6");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Task",
                newName: "Status");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "128c0747-3731-43b9-a75b-d284d78dc911", null, "User", "USER" },
                    { "93619a97-6dff-4c66-a1e0-513626792fe1", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "128c0747-3731-43b9-a75b-d284d78dc911");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93619a97-6dff-4c66-a1e0-513626792fe1");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Task",
                newName: "status");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1d27fff2-fe65-4992-af45-db48cd8efeb4", null, "User", "USER" },
                    { "4b399626-cfc3-4d0c-a5aa-49900509d5d6", null, "Admin", "ADMIN" }
                });
        }
    }
}
