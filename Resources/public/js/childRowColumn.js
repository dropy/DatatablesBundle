$(document).ready(function () {

    var detailRows = [];
    var datatableId = $('tbody').parent().attr('id');

    $('#'+datatableId).on('processing.dt', function () {
        handledetailsChildRow();
    } );

    function handledetailsChildRow() {
        $('td.details-control').on('click', function (e) {
            var tr = e.target.closest('tr');
            var url = tr.querySelector('.details-control i').getAttribute('data-content_route');

            if (tr.classList.contains('opened')) {
                hideOpenedDetailRow();
                return;
            }
            hideOpenedDetailRow();

            var detailIcon = tr.querySelector('.details-control i');
            detailIcon.classList.remove('glyphicon-plus-sign');
            detailIcon.classList.add('glyphicon-minus-sign');

            if (tr.classList.contains('shown')) {
                tr.classList.add('opened');
                tr.nextSibling.style['display'] = 'table-row';
            } else {
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (d) {
                        //Générer un callback JS ou récupération direct en template
                        tr.classList.add('shown');
                        tr.classList.add('opened');
                        $('<tr class="' + tr.classList[0] + ' child-row"><td></td><td colspan="' + (tr.children.length - 2) + '">' + d.html + '</td><td></td></tr>').insertAfter(tr);
                    }
                });
            }


        });
    }

    function hideOpenedDetailRow() {
        var detailOpened = document.querySelectorAll("tr[role='row'].opened");
        for (var i = 0; i < detailOpened.length; i++) {
            detailOpened[i].classList.remove('opened');
            detailOpened[i].nextSibling.style['display'] = 'none';
            //detailOpened[i].parentNode.removeChild(detailOpened[i].nextSibling);
            detailOpened[i].querySelector('.details-control i').classList.remove('glyphicon-minus-sign');
            detailOpened[i].querySelector('.details-control i').classList.add('glyphicon-plus-sign');
        }
    }
});