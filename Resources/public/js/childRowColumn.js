$(document).ready(function () {

    var detailRows = [];

    $('tbody').click('td.details-control', function(e){
        var tr = e.target.closest('tr');
        var url = tr.querySelector('.details-control i').getAttribute('data-content_route');

        hideOpenedDetailRow();
        if(tr.classList.contains('opened')){
            return;
        }

        var detailIcon = tr.querySelector('.details-control i');
        detailIcon.classList.remove('glyphicon-plus-sign');
        detailIcon.classList.add('glyphicon-minus-sign');

        if(tr.classList.contains('shown')){
            tr.classList.add('opened');
            tr.nextSibling.style['display'] = 'table-row';
        }else{
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(d){ //this is specific to my application since I'm adding a child table.
                    var html = parseDeclinationObject(d);
                    tr.classList.add('shown');
                    tr.classList.add('opened');
                    $( '<tr class="child-row"><td></td><td colspan="100%">'+html+'</td></tr>' ).insertAfter(tr);
                }
            });
        }


    });

    function hideOpenedDetailRow(){
        var detailOpened = document.querySelectorAll("tr[role='row'].opened");
        for(var i=0; i < detailOpened.length; i++){
            detailOpened[i].classList.remove('opened');
            detailOpened[i].nextSibling.style['display'] = 'none';
            //detailOpened[i].parentNode.removeChild(detailOpened[i].nextSibling);
            detailOpened[i].querySelector('.details-control i').classList.remove('glyphicon-minus-sign');
            detailOpened[i].querySelector('.details-control i').classList.add('glyphicon-plus-sign');
        }
    }

    function parseDeclinationObject(pDeclinations){
        if(pDeclinations.length > 0){
            var html = '<table class="table table-striped table-bordered table-hover"><tr><th>Id</th><th>Titre</th><th>SKU</th><th>Attributs</th></tr>';
            for(var i=0; i < pDeclinations.length; i++){
                declination = pDeclinations[i];
                html+='<tr><td>'+declination.id+'</td><td>'+declination.name+'</td><td>'+declination.sku+'</td><td>empty</td></tr>';

            }
            html+='</table>';
            return html;
        }else{
            return '<p>Aucune déclinaison pour ce parent</p>'
        }
    }
});