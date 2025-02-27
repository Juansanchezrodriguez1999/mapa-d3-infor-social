import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function MapaEspaña() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mapaDiv = d3.select("#mapa");
    const svg = mapaDiv.append("svg");

    const renderMapa = () => {
      const { width, height } = mapaDiv.node().getBoundingClientRect();
      svg.selectAll("*").remove();
      svg.attr("width", width).attr("height", height);

      d3.json("/espana.geojson").then((geojson) => {
        const projection = d3.geoMercator().fitSize([width, height], geojson);
        const path = d3.geoPath().projection(projection);

        svg.selectAll("path")
          .data(geojson.features)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", "#ccc")
          .attr("stroke", "#333")
          .on("mouseover", function () {
            d3.select(this).attr("fill", "#999");
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "#ccc");
          })
          .on("click", function (event, d) {
            setSelectedRegion(d.properties.name);
            setIsLoading(true); // Activar loading al hacer clic
            fetchWikipediaDescription(d.properties.name);
          });
      });
    };

    renderMapa();
    window.addEventListener("resize", renderMapa);

    return () => window.removeEventListener("resize", renderMapa);
  }, []);

  const fetchWikipediaDescription = (region) => {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(region)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.extract || "No hay información disponible.");
        fetchWikipediaLocationImage(region);
      })
      .catch(() => {
        setDescription("Error al obtener la información.");
        setImageUrl("/Flag-map_of_Spain_(subdivisions).svg.png");
        setIsLoading(false); 
      });
  };

  const fetchWikipediaLocationImage = (region) => {
    const url = `https://es.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=500&titles=${encodeURIComponent(region)}&origin=*`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const pages = data.query?.pages;
        const page = pages ? Object.values(pages)[0] : null;
        if (page?.thumbnail?.source) {
          setImageUrl(page.thumbnail.source);
        } else {
        }
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <div className="text-black flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg">
      <h1 className="font-bold text-xl">Comunidades autónomas</h1>
      <p>Si quieres conocer información sobre una comunidad, selecciónala en el mapa:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-200 border w-3/4 rounded-lg">
        <div className="p-4 rounded-lg border bg-gray-100 flex items-center border">
          <div id="mapa" className="w-full h-[500px] rounded-lg m-2"></div>
        </div>
        <div className="p-4 rounded-lg border bg-gray-100">
        <h2 className="text-xl font-bold">{!selectedRegion &&  ("No hay ninguna comunidad seleccionada")}</h2>
          <div className="flex flex-col items-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-500">Cargando datos...</p>
              </div>
            ) : (
              selectedRegion && (
                <div>
                  <h2 className="text-xl font-bold">{selectedRegion }</h2>
                  <img
                  src={imageUrl}
                  alt={`Imagen de ${selectedRegion}`}
                  className="w-2/5 h-auto rounded-lg max-w-2xl mx-auto border"
                />
                  <p className="mt-2 text-justify">{description}</p>
                </div>

              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
