$(document).ready(function () {
  var idQuantityMap =
    localStorage.getItem("addedProductMap") == undefined
      ? {}
      : JSON.parse(localStorage.getItem("addedProductMap"));
  var idQuantityMapKeyList =
    localStorage.getItem("addedProductKeyList") == undefined
      ? { list: [] }
      : JSON.parse(localStorage.getItem("addedProductKeyList"));

  var totalItemsCount = 0;
  var totalItemsAmount = 0;
  var orderItemArr = [];
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (response) {
      for (var i = 0; i < idQuantityMapKeyList.list.length; i++) {
        var prodId = idQuantityMapKeyList.list[i];
        console.log(prodId);
        for (var j = 0; j < response.length; j++) {
          if (response[j].id == prodId) {
            $("#leftDiv").append(
              $("<div>")
                .attr("class", "addedProdCard")
                .append(
                  $("<div>")
                    .attr("class", "prodAddedImg")
                    .append($("<img>").attr("src", response[j].preview)),
                  $("<div>")
                    .attr("class", "prodAddedDetails")
                    .append(
                      $("<h4>").html(response[j].name),
                      $("<p>").html("x" + idQuantityMap[response[j].id]),
                      $("<p>").html("Amount: Rs " + response[j].price)
                    )
                )
            );

            /////////////////////////////////

            totalItemsCount += idQuantityMap[response[j].id];
            totalItemsAmount +=
              idQuantityMap[response[j].id] * response[j].price;
            $("#cart-count").html(totalItemsCount);
            $("#item-count").html(idQuantityMapKeyList.list.length);
            $("#total-amount").html(totalItemsAmount);

            /////////////////////////////////

            var prodObj = {
              id: response[j].id,
              brand: response[j].brand,
              name: response[j].name,
              price: response[j].price,
              preview: response[j].preview,
              isAccessory: response[j].isAccessory,
            };

            for (var k = 0; k < idQuantityMap[response[j].id]; k++) {
              orderItemArr.push(prodObj);
            }
          }
        }
      }
    }
  );

  $("#button").click(function () {
    var url = "orderPlaced.html";
    var totalAmount = 0;
    for (var i = 0; i < orderItemArr.length; i++) {
      totalAmount += orderItemArr[i].price;
    }
    console.log(orderItemArr);
    var dataObj = {
      amount: totalAmount,
      products: orderItemArr,
    };
    $.post(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
      dataObj,
      function () {
        alert("Order Placed Successfully");
        localStorage.removeItem("addedProductKeyList");
        localStorage.removeItem("addedProductMap");
        $(location).attr("href", url);
      }
    );
  });
});
