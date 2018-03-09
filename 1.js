window.my = {};
/*��װһ���¼� ���ɽ����¼�*/
my.transitionEnd = function(dom,callback){
    //1.��˭���¼�
    //2.�¼���������ʲôҵ��
    if(!dom || typeof dom != 'object'){
        //ûdom��ʱ����߲���һ�������ʱ�� ����ֹͣ
        return false;
    }
    dom.addEventListener('transitionEnd', function(){
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd', function(){
        callback && callback();
    });
}

//��װһ��tap�¼�
my.tap = function(dom,callback){
    if(!dom || typeof dom != 'object'){
        //ûdom��ʱ����߲���һ�������ʱ�� ����ֹͣ
        return false;
    }

    var isMove = false; //�Ƿ񻬶���
    var time = 0;   //�ոմ�����Ļ���¼�  touchstart�Ĵ����¼�

    dom.addEventListener('touchstart',function(){
        //��¼��������¼���ʱ��
        time = Date.now();  //ʱ��� ����
    });
    dom.addEventListener('touchmove',function(){
        isMove = true;
    });
    window.addEventListener('touchend',function(e){
        //1.û�л�����
        //2.��Ӧ�¼���150ms����   Ҫ���clickҪ��Ӧ��
        if(!isMove && (Date.now()-time)<150 ){
            callback && callback(e);
        }

        //���ò���
        isMove = false;
        time = 0;
    });

}