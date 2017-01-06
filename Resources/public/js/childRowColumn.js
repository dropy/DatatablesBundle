$(document).ready(function () {

    var detailRows = [];

    var dt = $('tbody').on('click', 'td.details-control', function(event){
        event.preventDefault();
        event.stopPropagation();

        var tr = $(this).closest('tr');
        var url = $('i', $(this)).data('content_route');
        var ptable = $(this).closest('table').DataTable();
        var row = ptable.row(tr);

        var rid =  row.id();
        console.log(rid);
        var idx = $.inArray( rid , detailRows );
        console.log(idx);

        if(row.child.isShown()){
            tr.removeClass('details');
            row.child.hide();
            detailRows.splice( idx, 1 );
        } else {
            tr.addClass('details');
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function(d){ //this is specific to my application since I'm adding a child table.
                    row.child(d.html).show();
                    $('#' + d.json.id).DataTable();
                }
            });
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( rid );
            }
            console.log(detailRows);
        }
    return ptable;
});

    dt.on('draw', function(){
        $.each(detailRows, function(i,id){
            $('#' + id+ ' td.details-control').trigger('click');
        });
    });
});