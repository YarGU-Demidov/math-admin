const config = {
  theme: "modern",
  // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
  plugins:
    "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern",
  toolbar:
    "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  ",
  image_advtab: true,
  imagetools_toolbar:
    "rotateleft rotateright | flipv fliph | editimage imageoptions",
  content_css: [
    "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
    "//www.tinymce.com/css/codepen.min.css"
  ]
};
export default config;
