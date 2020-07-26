fetch("https://api.coingecko.com/api/v3/exchanges").then(function (res) {
  res.json().then(function (data) {
    for (var i = 0; i <= data.length; i++) {
      $("#stats").append(
        `<tr>
  <th scope="row">${data[i].trust_score_rank}</th>
  <td>
  <img width="25" src="${data[i].image}">
  ${data[i].name}</td>

  <td><a href="${data[i].url}">${data[i].url}</a></td>

  <td>${data[i].trade_volume_24h_btc_normalized}</td>

</tr>`
      );
    }
  });
});
