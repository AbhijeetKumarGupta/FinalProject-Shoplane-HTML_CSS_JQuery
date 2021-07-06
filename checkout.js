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

  for (var i = 0; i < idQuantityMapKeyList.list.length; i++) {
    var prodId = idQuantityMapKeyList.list[i];
    $.get(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + prodId,
      function (response) {
        totalItemsCount += idQuantityMap[response.id];
        totalItemsAmount += idQuantityMap[response.id] * response.price;
        $("#cart-count").html(totalItemsCount);
        $("#item-count").html(idQuantityMapKeyList.list.length);
        $("#total-amount").html(totalItemsAmount);

        var prodObj = {
          id: response.id,
          brand: response.brand,
          name: response.name,
          price: response.price,
          preview: response.preview,
          isAccessory: response.isAccessory,
        };
        for (var j = 0; j < idQuantityMap[response.id]; j++) {
          orderItemArr.push(prodObj);
        }
      }
    );
  }
  console.log(orderItemArr);
  console.log(totalItemsAmount);
  for (var i = 0; i < idQuantityMapKeyList.list.length; i++) {
    var prodId = idQuantityMapKeyList.list[i];
    $.get(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + prodId,
      function (response) {
        $("#leftDiv").append(
          $("<div>")
            .attr("class", "addedProdCard")
            .append(
              $("<div>")
                .attr("class", "prodAddedImg")
                .append($("<img>").attr("src", response.preview)),
              $("<div>")
                .attr("class", "prodAddedDetails")
                .append(
                  $("<h4>").html(response.name),
                  $("<p>").html("x" + idQuantityMap[response.id]),
                  $("<p>").html("Amount: Rs " + response.price)
                )
            )
        );
      }
    );
  }

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
