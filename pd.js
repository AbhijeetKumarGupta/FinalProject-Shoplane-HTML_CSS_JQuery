$(document).ready(function () {
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }

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
  var id = getUrlParameter("id");
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id,
    function (response) {
      var productData = response;
      var mainDiv = $("#mainDiv");

      var largeImageDiv = $("<div>");
      largeImageDiv.attr("id", "imageLargeDiv");

      var imageLarge = $("<img>");
      imageLarge.addClass("largeImage");
      imageLarge.attr("src", productData.preview);

      largeImageDiv.append(imageLarge);

      var detailsDiv = $("<div>");
      detailsDiv.attr("id", "detailsDiv");

      var productNameHeading = $("<h1>");
      productNameHeading.attr("id", "name");
      productNameHeading.html(productData.name);
      var productBrandNameHeading = $("<h4>");
      productBrandNameHeading.attr("id", "brand");
      productBrandNameHeading.html(productData.brand);
      var productPriceSpan = $("<span>");
      productPriceSpan.attr("id", "price");
      productPriceSpan.html(productData.price);
      var productPriceHeading = $("<h3>");
      productPriceHeading.attr("id", "priceHead");
      productPriceHeading.html("Price: Rs ");
      productPriceHeading.append(productPriceSpan);
      var productDescriptionHeading = $("<h3>");
      productDescriptionHeading.html("Description");
      productDescriptionHeading.attr("class", "otherHead");
      var productDescription = $("<p>");
      productDescription.attr("id", "description");
      productDescription.html(productData.description);
      var productPreviewHeading = $("<h3>");
      productPreviewHeading.attr("id", "pp");
      productPreviewHeading.attr("class", "otherHead");
      productPreviewHeading.html("Product Preview");

      var previewImagesDiv = $("<div>");
      previewImagesDiv.attr("id", "smallImages");

      var previewImages = productData.photos;

      for (var i = 0; i < previewImages.length; i++) {
        var smallImage = $("<img>");
        smallImage.addClass("smallImg");
        smallImage.attr("id", "si" + (i + 1));
        smallImage.attr("src", previewImages[i]);
        if (smallImage.attr("id") == "si1") {
          smallImage.attr("class", "smallImg active");
        }
        smallImage.click(function () {
          $(".smallImg.active").attr("class", "smallImg");
          this.className = "smallImg active";
          imageLarge.attr("src", this.src);
        });
        previewImagesDiv.append(smallImage);
      }
      var addToCartButton = $("<div>");
      addToCartButton.attr("id", "button");
      addToCartButton.html("Add to Cart");
      addToCartButton.click(function () {
        this.className = "bigger";
        var idQuantityMap =
          localStorage.getItem("addedProductMap") == undefined
            ? {}
            : JSON.parse(localStorage.getItem("addedProductMap"));
        var idQuantityMapKeyList =
          localStorage.getItem("addedProductKeyList") == undefined
            ? { list: [] }
            : JSON.parse(localStorage.getItem("addedProductKeyList"));
        if (idQuantityMapKeyList.list.indexOf(id) == -1) {
          idQuantityMapKeyList.list.push(id);
        }
        var quantity = idQuantityMap[id] == undefined ? 0 : idQuantityMap[id];
        quantity++;
        idQuantityMap[id] = quantity;
        localStorage.setItem("addedProductMap", JSON.stringify(idQuantityMap));
        localStorage.setItem(
          "addedProductKeyList",
          JSON.stringify(idQuantityMapKeyList)
        );
        updateCart();
        setTimeout(function () {
          console.log(this);
          $(".bigger").attr("class", "");
        }, 200);
      });

      detailsDiv.append(productNameHeading);
      detailsDiv.append(productBrandNameHeading);
      detailsDiv.append(productPriceHeading);
      detailsDiv.append(productDescriptionHeading);
      detailsDiv.append(productDescription);
      detailsDiv.append(productPreviewHeading);
      detailsDiv.append(previewImagesDiv);
      detailsDiv.append(addToCartButton);

      mainDiv.append(largeImageDiv);
      mainDiv.append(detailsDiv);
      $("#loading").css("display", "none");
    }
  );
});
