var numberOfPage = 1;

      $("#nextbutton").click(function () {
        $("#stats").empty();
        numberOfPage = numberOfPage + 1;
        console.log("NEXT!!!");
        nextPage();
      });

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
        fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${numberOfPage}&sparkline=false`
        ).then(function (res) {
          // reads the data  and converts the data to a different format.
          res.json().then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
              var color24h = "";
              if (data[i].market_cap_change_percentage_24h > 0)
                color24h = "filipe";
              if (data[i].market_cap_change_percentage_24h < 0)
                color24h = "ivan";
              var marketCap = "";
              if (data[i].market_cap_change_percentage_24h !== null)
                marketCap = data[i].market_cap_change_percentage_24h;

              x = new Intl.NumberFormat().format(data[i].market_cap);
              // console.log(data[i].market_cap_change_percentage_24h, i);

              $("#stats").append(
                `<tr>
          <th scope="row">${data[i].market_cap_rank}</th>
          <td>
          <img width="25" src="${data[i].image}">
          ${data[i].name}</td>
          <td>$${x}</td>
          <td>$${data[i].current_price}</td>
          <td>${data[i].price_change_24h}</td>
          <td>${data[i].circulating_supply}</td>
          <td class="${color24h}" >${marketCap.toFixed(2)}</td>

        </tr>`
              );
            }
          });
        });
      }
      nextPage();
