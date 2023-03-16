import { Box, TextField } from "@mui/material";
import { useEffect, useState, } from "react";

const GoogleAutocomplete = ({credential, setCredential}) => {

    const [locationData, setLocationData] = useState({});


  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=&libraries=places";
    document.body.appendChild(script);

    
    const handleLoad = () => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("outlined-basic"),
            {
                types: ["(cities)"],
                componentRestrictions: { country: "fr" },
            }
        );
        autocomplete.setFields(["address_components", "formatted_address"]);
        autocomplete.addListener("place_changed", () => {
            const lat = autocomplete.getPlace().geometry.location.lat();
            const lng = autocomplete.getPlace().geometry.location.lng();
            console.log("lat", lat, "lng", lng);
            let place = autocomplete.getPlace();
            place.lat = lat;
            place.lng = lng;
            setLocationData(place);
        });
    };
    script.addEventListener("load", handleLoad);
    
    return () => {
      script.removeEventListener("load", handleLoad);
    };
}, []);

    useEffect(() => {
        if(locationData) {
            console.log("google cred", locationData)
        //     setCredential({
        //         ...credential,
        //         ...locationData
        //     });
        }
    }, [locationData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root,.MuiButton-root": {
          mb: 2,
        },
      }}
    >
      <TextField
        id="outlined-basic"
        label="Localisation"
        variant="outlined"
        name="localisation"
        // onChange={handleChange}
      />
    </Box>
  );
};

export default GoogleAutocomplete;
