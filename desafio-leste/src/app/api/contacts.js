export async function getData() {
  try {
    const response = await fetch(
      'https://my.api.mockaoo.com/lestetelecom/test.json?key=f55c4060',
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'Erro ao recuperar os dados do servidor! Buscando dados locais...',
      error,
    );

    // Faz um fetch nos dados locais, caso a API tenha ultrapassado o limite diário de requisições.
    const localResponse = await fetch('/test.json');
    const localData = await localResponse.json();
    return localData;
  }
}
