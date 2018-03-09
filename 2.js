window.onload = function(){
    /*
     * 1.�Զ��ֲ�  ��ʱ��  �޷��ν�  ��������˲�䶨λ
     * 2.����Ҫ�����ֲ��Ĺ����ı��Ӧ�ĵ�  �ı䵱ǰ��ʽ  ��ǰͼƬ������
     * 3.��ָ������ʱ�����ֲ�ͼ����   touch�¼�  ��¼������ĸı� �ı��ֲ�ͼ�Ķ�λ��λ��css3��
     * 4.�������ľ��벻����һ���ľ����ʱ��  ��Ҫ������ȥ  ���ɵ���ʽȥ��
     * 5.������������һ���ľ���  ��Ҫ ���� ��һ�Ż�����һ��  �������ķ��� һ���ľ��루��Ļ������֮һ��
     * */

    var imageCount = 5; //ҳ���������ֲ���ͼƬ��5�Ų�ͬ��
    //�ֲ�ͼ�����
    var banner = document.querySelector('.banner');
    //ͼƬ�Ŀ��
    var width = banner.offsetWidth;
    //ͼƬ����
    var imageBox = banner.querySelector('ul:first-child');
    //�����
    var pointBox = banner.querySelector('ul:last-child');
    //���еĵ�
    var points = pointBox.querySelectorAll('li');

    //���÷���
    //�ӹ���
    var addTransition = function(){
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransition = "all 0.3s";/*������*/
    };
    //�������
    var removeTransition = function(){
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    }
    //��λ
    var setTranslateX = function(translateX){
        imageBox.style.transform = "translateX("+translateX+"px)";
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
    }

    //����ʵ��
    //�Զ��ֲ�  ��ʱ��  �޷��ν�  ��������˲�䶨λ
    var index = 1;
    var timer = setInterval(function(){
        index++ ;   //�Զ��ֲ�����һ��
        //�ı䶨λ  ��������ʽȥ�ı�  transition transform translate
        addTransition();    //�ӹ��ɶ���
        setTranslateX(-index * width);  //��λ
    },3000);

    //�ȹ��ɽ���֮�������޷��ν�
    my.transitionEnd(imageBox, function(){
        //�����¼��������ҵ���߼�
        if(index > imageCount ){
            index = 1;
        }else if(index <= 0){
            index = imageCount;
        }
        removeTransition(); //�������
        setTranslateX(-index * width);  //��λ
        setPoint(); //���õײ���ʾ��ǰͼƬ��Ӧ��Բ��
    });

    //�ı䵱ǰ��ʽ  ��ǰͼƬ������
    var setPoint = function(){
        //�����һ�ε�now
        for(var i = 0 ; i < points.length ; i++){
            points[i].className = " ";
        }
        //��ͼƬ��Ӧ�ĵ������ʽ
        points[index-1].className = "now";
    }

    /*
     ��ָ������ʱ�����ֲ�ͼ����   touch�¼�  ��¼������ĸı� �ı��ֲ�ͼ�Ķ�λ��λ��css3��
     �������ľ��벻����һ���ľ����ʱ��  ��Ҫ������ȥ  ���ɵ���ʽȥ��
     ������������һ���ľ���  ��Ҫ ���� ��һ�Ż�����һ��  �������ķ��� һ���ľ��루��Ļ������֮һ��
     */
    //touch�¼�
    var startX = 0; //��¼��ʼ  �ոմ����ĵ��λ�� x������
    var moveX = 0;  //������ʱ��x��λ��
    var distanceX = 0;  //�����ľ���
    var isMove = false; //�Ƿ񻬶���

    imageBox.addEventListener('touchstart', function(e){
        clearInterval(timer);   //�����ʱ��
        startX = e.touches[0].clientX;  //��¼��ʼX
        console.log(startX);
    });

    imageBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;   //����ʱ���X
        distanceX = moveX - startX; //�����ƶ��ľ���
        //���㵱ǰ��λ  -index*width+distanceX
console.log(moveX );
        removeTransition(); //�������
        setTranslateX(-index * width + distanceX);  //ʵʱ�Ķ�λ
        isMove = true;  //֤��������
    });

    //��ģ������ģ��Ļ����������� ��ʧ�����  �����ģ������ʱ����window
    imageBox.addEventListener('touchend', function(e){
        // �������� 1/3 ��Ϊ������Ч������Ϊ��Ч����������ȥ
        if(isMove && Math.abs(distanceX) > width/3){
            //5.������������һ���ľ���  ��Ҫ ���� ��һ�Ż�����һ��  �������ķ���*/
            if(distanceX > 0){  //��һ��
                index --;
            }
            else{   //��һ��
                index ++;
            }
        }
        addTransition();    //�ӹ��ɶ���
        setTranslateX(-index * width);    //��λ

        if(index > imageCount ){
            index = 1;
        }else if(index <= 0){
            index = imageCount;
        }
        setPoint();

        //���ò���
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        //�Ӷ�ʱ��
        clearInterval(timer);   //�Ͻ� �����һ�ζ�ʱ��
        timer= setInterval(function(){
            index++ ;  //�Զ��ֲ�����һ��
            addTransition();    //�ӹ��ɶ���
            setTranslateX(-index * width);    //��λ
        },3000);
    });
};