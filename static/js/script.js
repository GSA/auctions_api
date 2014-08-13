$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $("#hmda-lar-fields tbody").each(function () {
    var $body = $(this);

    var ajax = $.ajax({
      url: "../static/sam_registrations.json",
      dataType: "json"
    });

    ajax.done(function (data) {
      var fields = data['fields'];
      var fieldNames = _(fields).keys().sort();

      _(fieldNames).each(function (fieldName) {
        var info = fields[fieldName];
				var description = "<td>" + info['description'] + "<p><p><em>Could be: </em><code>" + info['could_be'] + "</code>";
				if (info['url'] != null) {
					description += "<p><a href='" + info['url'] + "'>More Info</a>";
				}
				description += "</td>";
        var $row = $("<tr></tr>");
        $row.
          append("<td><code>" + fieldName + "</code></td>").
					append(description).
					append("<td>" + info['type'] + "</td>");
					//append("<td>" + info['could_be'] + "</td>");
          //append("<td>" + (info['indexed'] ? "true" : "false") + "</td>");
        $body.append($row);
      });
    });
  });
});

// jsonUrl: URL to the JSON-formatted metadata
// tableId: The table to populate
// orderAndDesc: An array of objects with keys { key: k, header: h }
//   k maps to the key to pull from the JSON
//   h is the text for the header at the top of the table
function addCodeTable(jsonUrl, tableId, orderAndDesc) {
	var ajax = $.ajax({
		url: jsonUrl,
		dataType: "json"
	});
	var data = null;
	ajax.done(function(data) {
		// don't worry about processing anything not an array
		console.log('Got the JSON');
		console.log(data);
		if (!$.isArray(data) || data.length == 0) {
			console.log(' Bad array');
			return;
		}
		// populate the orderAndDesc array
		if (!orderAndDesc) {
			orderAndDesc = json[0].keys().map(function(k) {
				return {key: k, header: k};
			});
		}
		console.log('Set Order and Desc');
		console.log(orderAndDesc);
		$('#' + tableId).each(function() {
			var $body = $(this);
			if ($body.length) {
				console.log('Found table #' + tableId);
			}
			// The expectation is that the data is in an array 
			// of objects with the same fields in them
			// the orderAndDesc array is an array of keys mapping to a description
			// of the key used at the header of the table.

			// Add the header

			var $thead = $body.find('thead');
			console.log('THEAD ' + $thead);
			var $theadrow = $('<tr></tr>');
			_(orderAndDesc).each(function(head) {
				$theadrow.append('<th>' + head.header + '</th>');
			});
			$thead.append($theadrow);
			$body = $body.append($thead);
			// Add the data
			$tbody = $body.find('tbody');
			_(data).each(function(row) {
				var $tr = $('<tr></tr>');
				_(orderAndDesc).each(function(k) {
					$tr.append('<td>' + row[k.key] + '</td>');
				});
				$tbody.append($tr);
			});
			$body.append($tbody);
		});
	});
	console.log('Testing for data != null');

	if (data == null) {
		return;
	}
	console.log('Got ' + data.length + ' codes');

}
