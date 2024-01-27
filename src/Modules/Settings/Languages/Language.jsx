import React from "react";

export const Language = () => {
    const languages = [
        { value: '', text: "languages" },
        { value: 'en', text: "English" },
        { value: 'uz', text: "Uzbek" },
        { value: 'rus', text: "Russia" }
    ]
    const { t } = useTranslation(); 
  
    const [lang, setLang] = React.useState('en');
  
    const handleChange = e => { 
        setLang(e.target.value);
        let loc = "http://localhost:3000/";
        window.location.replace(loc + "?lng=" + e.target.value);
    }
    return(
        <></>
    )
}