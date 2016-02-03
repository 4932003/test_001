'use strict';

 function startItem(itemName){
        var aName =itemName+" a";
        $(document).on('click', aName, function () {
            $(itemName).data('star', this.innerHTML);
        }).on('mouseenter', aName, function () {
            setStar(this,itemName);
        }).on('mouseleave', aName, function () {
            var $rstar = $(itemName);
            var level = $rstar.data('star');
           var $stars = $rstar.find('a');
            if (level) {
                setStar($stars[level],itemName);
                
            } else {
                $stars.css('background-position', '-263px -439px');
                $(itemName+' .s-result').css('color','#333').html('请打分');
            }
        });
}

function setStar(star,itemName) {
            var $this = $(star);
            var level = $this.html();
            var n;
            if (level >= '3') {
                n = '-263px -366px';
            } else if (level == '2') {
                n = '-263px -389px';
            } else {
                n = '-263px -412px';
            }
            $this.prevAll().andSelf().css('background-position', n);
            $this.nextAll().css('background-position', '-263px -439px');
            $(itemName+' .s-result').css('color','#c00').html($this.attr('title'));
        } 
