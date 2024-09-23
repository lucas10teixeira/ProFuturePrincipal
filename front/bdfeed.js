let button = document.getElementById("postButton");

button.onclick = async function() {
    let descricao = document.getElementById("posttexto").value;
   
    let data = {descricao};
    if (!descricao) {
        // Se n tiver aparece essa msg
        Swal.fire('Preencha todos os campos!', '', 'error');
        return;
    }
    const response = await fetch ('http://localhost:3001/api/store/feed', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });
    
    let content = await response.json();
    
    console.log(content);
        if(content.sucess) {
            Swal.fire('Postado!', '', 'sucess');
            return;
            
            
    }};
    


