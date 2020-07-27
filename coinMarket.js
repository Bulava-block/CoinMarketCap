// we are ib the first page
var numberOfPage = 1;

// it recognizes the button. On click it removes all the previous data, increases page number by 1 and calls nextPage function
$("#nextbutton").click(function () {
  $("#stats").empty();
  numberOfPage = numberOfPage + 1;

  console.log("NEXT!!!");
  nextPage();
});
// just like the "next" button except it reduces the number of page and then calls the nextpage function
$("#previousButton").click(function () {
  $("#stats").empty();
  if (numberOfPage > 1) {
    numberOfPage = numberOfPage - 1;
  }

  console.log("Whatuuup");

  nextPage();
});

function nextPage() {
  // numberOfPage++;
  console.log(numberOfPage);
  //    fetch function gathers the data from the API website
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${numberOfPage}&sparkline=false`
  ).then(function (res) {
    // reads the data  and converts the data to a different format.
    res.json().then(function (data) {
      console.log(data);
      //          now it takes the converted data and finds the number of the object(i) that we need starting from obj N"0"
      //                 it keeps going untill it reaches the final object data.length on the API page
      for (var i = 0; i < data.length; i++) {
        //              next is just the conditions the determine the color and the way it shown for few properties of the object
        var color24h = "";
        if (data[i].market_cap_change_percentage_24h > 0) color24h = "filipe";
        if (data[i].market_cap_change_percentage_24h < 0) color24h = "ivan";
        var marketCap = "";
        if (data[i].market_cap_change_percentage_24h !== null)
          marketCap = data[i].market_cap_change_percentage_24h.toFixed(2) + "%";
        // line 45 is to write the propery market cap change% in certain format with the right number of commas.
        x = new Intl.NumberFormat().format(data[i].market_cap);
        // console.log(data[i].market_cap_change_percentage_24h, i);

        //                    48-54 is the conditions on which "Previous" buttons appears and disappears

        //                    56- 74 is the the properties that we take form the objects from APi website and append them on the list on the actual page.
        $("#stats").append(
          `<tr>
          <th scope="row">${data[i].market_cap_rank}</th>
          <td>
          <img width="25" src="${data[i].image}">
          ${data[i].name}</td>
          <td>$${x}</td>
          <td>$${data[i].current_price}</td>
          <td>${data[i].price_change_24h}</td>
          <td>${data[i].circulating_supply} ${data[i].symbol.toUpperCase()}</td>
          <td class="${color24h}" >${marketCap}</td>

        </tr>`
        );
      }
    });
  });
}
//  calling this huge function. This is the actual command that executes this.
nextPage();
