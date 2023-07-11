using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VAR.Migrations
{
    /// <inheritdoc />
    public partial class v4setadmintablenullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemDetails_Items_itemId",
                table: "OrderItemDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemDetails_Orders_orderId",
                table: "OrderItemDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderItemDetails",
                table: "OrderItemDetails");

            migrationBuilder.RenameTable(
                name: "OrderItemDetails",
                newName: "orderItemDetails");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItemDetails_itemId",
                table: "orderItemDetails",
                newName: "IX_orderItemDetails_itemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orderItemDetails",
                table: "orderItemDetails",
                columns: new[] { "orderId", "itemId" });

            migrationBuilder.AddForeignKey(
                name: "FK_orderItemDetails_Items_itemId",
                table: "orderItemDetails",
                column: "itemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orderItemDetails_Orders_orderId",
                table: "orderItemDetails",
                column: "orderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderItemDetails_Items_itemId",
                table: "orderItemDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_orderItemDetails_Orders_orderId",
                table: "orderItemDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orderItemDetails",
                table: "orderItemDetails");

            migrationBuilder.RenameTable(
                name: "orderItemDetails",
                newName: "OrderItemDetails");

            migrationBuilder.RenameIndex(
                name: "IX_orderItemDetails_itemId",
                table: "OrderItemDetails",
                newName: "IX_OrderItemDetails_itemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItemDetails",
                table: "OrderItemDetails",
                columns: new[] { "orderId", "itemId" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemDetails_Items_itemId",
                table: "OrderItemDetails",
                column: "itemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemDetails_Orders_orderId",
                table: "OrderItemDetails",
                column: "orderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
