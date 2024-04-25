import axios from "axios";

const githubApi = "https://api.github.com/orgs/takenet/repos";
const rota = `${githubApi}?direction=desc&sort=created&type=public&per_page=100`;

export async function desafioHandler(req, res) {
  try {
    const list = [];

    const gitHubResponse = await axios.get(rota);

    for (let i = 0; i < gitHubResponse.data.length; i++) {
      const repo = gitHubResponse.data[i];

      if (repo.language == "C#") {
        list.push(repo);
      }
      if (list.length == 5) {
        break;
      }
    }

    const response = transform(list);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

function transform(items) {
  return {
    itemType: "application/vnd.lime.document-select+json",
    items: items.map((item) => ({
      header: {
        type: "application/vnd.lime.media-link+json",
        value: {
          title: item.full_name,
          text: item.description,
          type: "image/jpeg",
          uri: item.owner.avatar_url,
        },
      },
      options: [
        {
          label: {
            type: "application/vnd.lime.web-link+json",
            value: {
              title: "Abrir repositório",
              uri: item.html_url,
            },
          },
        },
      ],
    })),
  };
}
