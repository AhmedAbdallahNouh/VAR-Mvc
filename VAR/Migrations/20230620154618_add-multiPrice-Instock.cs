using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VAR.Migrations
{
    /// <inheritdoc />
    public partial class addmultiPriceInstock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Playstations",
                newName: "SinglePrice");

            migrationBuilder.AddColumn<int>(
                name: "MultiPrice",
                table: "Playstations",
                type: "int",
                maxLength: 50,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InStock",
                table: "Items",
                type: "int",
                maxLength: 50,
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MultiPrice",
                table: "Playstations");

            migrationBuilder.DropColumn(
                name: "InStock",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "SinglePrice",
                table: "Playstations",
                newName: "Price");
        }
    }
}
