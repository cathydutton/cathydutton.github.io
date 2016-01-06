
/*
	TWEET
	------------------------------- */
	// 
	// var seleccionado = '';
	// var horiz, vert, referencia;
	// function carga() {
	//   referencia = document.getElementsByClassName('content')[0]
	//   var pajarito = document.createElement('span');
	//   pajarito.setAttribute('id', 'js-tweet');
	//   pajarito.setAttribute('onmousedown', 'abre()');
	//   referencia.appendChild(pajarito);
	//   referencia.onmouseup = captura;
	// }
	//
	// function captura(e) {
	//   seleccionado = (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
	//   if (seleccionado != '') {
	//     horiz= ((e.x) ? e.x : e.clientX) ;
	//     vert= ((e.y) ? e.y : e.clientY) ;
	//     document.getElementById('js-tweet').style.display = 'inline-block';
	//     document.getElementById('js-tweet').style.left = horiz + 'px';
	//     document.getElementById('js-tweet').style.top = vert + 'px';
	//   } else {
	//     document.getElementById('js-tweet').style.display = 'none';
	//   }
	// }
	//
	// function abre() {
	//   var origen = window.location.href;
	//   var mensaje = seleccionado.toString().substring(0, 100);
	//   var direccion = 'http://twitter.com/home?status=' + mensaje + ' ' + origen;
	//   window.open(direccion, '', 'width=500,height=500');
	// }
	//
	// onload = carga;
