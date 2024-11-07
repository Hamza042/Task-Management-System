using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskManagement.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34d1e2a5-5846-4c67-8c1d-3d1892b72aa9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af3d367f-00ed-45cd-9acb-fa53de9bc855");

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "Task",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1d27fff2-fe65-4992-af45-db48cd8efeb4", null, "User", "USER" },
                    { "4b399626-cfc3-4d0c-a5aa-49900509d5d6", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1d27fff2-fe65-4992-af45-db48cd8efeb4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b399626-cfc3-4d0c-a5aa-49900509d5d6");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Task");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34d1e2a5-5846-4c67-8c1d-3d1892b72aa9", null, "User", "USER" },
                    { "af3d367f-00ed-45cd-9acb-fa53de9bc855", null, "Admin", "ADMIN" }
                });
        }
    }
}
