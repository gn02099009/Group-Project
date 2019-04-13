import axios from "axios";

export default async function getData(keyword) {
  // APP config
  const key = "d5bdef52f659cb9e8f4a43fe668b3765";
  const secret = "f4247377f9653ed7";

  // API setting
  const url = "https://api.flickr.com/services/rest/";

  // API paramters
  let params = {};
  params = {
    method: "flickr.photos.search", // https://www.flickr.com/services/api/flickr.photos.search.html
    api_key: key, // Your API application key
    tags: keyword, // A comma-delimited list of tags. Photos with one or more of the tags listed will be returned.
    //   text: keyword, // A free text search. Photos who's title, description or tags contain the text will be returned.
    format: "json",
    nojsoncallback: 1,
    per_page: 10 // chunk size to fetch
  };

  const response = await axios.get(url, { params });

  // handle success
  //console.log(response.data);

  const { data } = response;

  let result = [];

  data.photos.photo.map((gp, i) => {
    const farmId = gp.farm;
    const serverId = gp.server;
    const id = gp.id;
    const secret = gp.secret;

    //console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

    //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

    result.push({
      src: `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`,
      title: gp.title,
      datetime: "2019-04-13 00:00:00",  //hard-code first, to-do
    });
  });

  return result;
}