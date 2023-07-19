using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VAR.Migrations
{
    /// <inheritdoc />
    public partial class adminpasswordlong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Playstations_playstationID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "playstationID",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "phone",
                table: "Admins",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Playstations_playstationID",
                table: "Orders",
                column: "playstationID",
                principalTable: "Playstations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Playstations_playstationID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "playstationID",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "phone",
                table: "Admins",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Playstations_playstationID",
                table: "Orders",
                column: "playstationID",
                principalTable: "Playstations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
