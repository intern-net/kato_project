<script>
$(function(){
  $(".soundBtn").click(function(){
    if($(this).hasClass("clicked")){
      $(this).removeClass("clicked");
      document.getElementById("overSound").currentTime = 0; //再生秒数を 0 にセット
      document.getElementById("overSound").play();
    }else{
      $(this).addClass("clicked");
      document.getElementById("overSound").pause();
    }
  });
});
</script>