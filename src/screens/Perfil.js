const selectImage = () => {
    const options = {
      title: 'Selecionar Imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Você pode também querer enviar a imagem para o servidor neste ponto
        const source = { uri: response.uri };

        // Atualiza o estado e mostra a nova imagem
        setUserImage(source.uri);
        uploadImage(response); // Implemente esta função conforme necessário
      }
    });
  };

  const uploadImage = (response) => {
    // Crie uma instância FormData
    const data = new FormData();

    // Adicione a imagem capturada
    data.append('image', {
      name: response.fileName,
      type: response.type,
      uri: response.uri
    });

    // Use a biblioteca 'fetch' ou 'axios' para enviar a imagem ao servidor
    fetch('url_da_sua_api/upload', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.json())
    .then(response => {
      console.log('Upload realizado com sucesso:', response);
    })
    .catch(error => {
      console.error('Erro ao fazer upload da imagem:', error);
    });
  };