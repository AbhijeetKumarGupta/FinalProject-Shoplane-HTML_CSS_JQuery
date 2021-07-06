$(document).ready(function () {
  $(".center").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  function updateCart() {
    var idQuantityMap =
      localStorage.getItem("addedProductMap") == undefined
        ? {}
        : JSON.parse(localStorage.getItem("addedProductMap"));
    var idQuantityMapKeyList =
      localStorage.getItem("addedProductKeyList") == undefined
        ? { list: [] }
        : JSON.parse(localStorage.getItem("addedProductKeyList"));
    var totalItemsCount = 0;
    for (var i = 0; i < idQuantityMapKeyList.list.length; i++) {
      totalItemsCount += idQuantityMap[idQuantityMapKeyList.list[i]];
      $("#cart-count").html(totalItemsCount);
    }
  }
  updateCart();
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (response) {
      addCards(response);
    }
  );

  var mainClothingDiv = $("#clothingDiv");
  var mainAccessoriesgDiv = $("#accessoriesDiv");

  function addCards(productList) {
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].isAccessory === false) {
        var cardDivClothing = $("<div>");
        cardDivClothing.addClass("card");
        cardDivClothing.attr("id", productList[i].id);
        cardDivClothing.click(function () {
          var url = "pd.html?id=" + this.id;
          $(location).attr("href", url);
        });

        var divImage = $("<div>");
        divImage.addClass("img");
        var prodImg = $("<img>");
        prodImg.attr("src", productList[i].preview);
        divImage.append(prodImg);

        var divDetails = $("<div>");
        divDetails.addClass("details");
        var prodNameH3 = $("<h3>");
        var prodBrandH4 = $("<h4>");
        var prodPriceH5 = $("<p>");
        prodNameH3.html(productList[i].name);
        prodBrandH4.html(productList[i].brand);
        prodPriceH5.html("Rs " + productList[i].price);
        divDetails.append(prodNameH3);
        divDetails.append(prodBrandH4);
        divDetails.append(prodPriceH5);

        cardDivClothing.append(divImage);
        cardDivClothing.append(divDetails);

        mainClothingDiv.append(cardDivClothing);
      } else {
        var cardDivAccessories = $("<div>");
        cardDivAccessories.addClass("card");
        cardDivAccessories.attr("id", productList[i].id);
        cardDivAccessories.click(function () {
          var url = "pd.html?id=" + this.id;
          $(location).attr("href", url);
        });

        var divImage = $("<div>");
        divImage.addClass("img");
        var prodImg = $("<img>");
        prodImg.attr("src", productList[i].preview);
        divImage.append(prodImg);

        var divDetails = $("<div>");
        divDetails.addClass("details");
        var prodNameH3 = $("<h3>");
        var prodBrandH4 = $("<h4>");
        var prodPriceH5 = $("<p>");
        prodNameH3.html(productList[i].name);
        prodBrandH4.html(productList[i].brand);
        prodPriceH5.html("Rs " + productList[i].price);
        divDetails.append(prodNameH3);
        divDetails.append(prodBrandH4);
        divDetails.append(prodPriceH5);

        cardDivAccessories.append(divImage);
        cardDivAccessories.append(divDetails);

        mainAccessoriesgDiv.append(cardDivAccessories);
      }
    }
  }

  $("#cart-wrapper").click(function () {
    var url = "checkout.html";
    $(location).attr("href", url);
  });
});
