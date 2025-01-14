import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Spacer } from "@nextui-org/react";
import { FaSave } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import Itags from "../types/Itags";

interface Props {
    tags: Itags | null;
    file: string;
}

function Form({ tags, file }: Props) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<Itags>({
        title: "",
        artist: "",
        album: "",
        year: "",
        genre: "",
        composer: "",
        producer: "",
        bpm: "",
        copyright: "",
        image: null,
        raw: null,
        cover: "",
        coverBase64: "",
        lyrics: "",
        originalArtist: "",
        comments: "",
    });

    useEffect(() => {
        if (tags) {
            setFormValues(tags);
        }
    }, [tags]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!formValues) {
        return <h1>FILE NOT FOUND</h1>;
    }

    const fields = [
        { name: "title", label: "Título", placeholder: "Digite o título" },
        { name: "artist", label: "Artista", placeholder: "Digite o artista" },
        { name: "album", label: "Álbum", placeholder: "Digite o álbum" },
        { name: "year", label: "Ano", placeholder: "2023", type: "number" },
        { name: "genre", label: "Gênero", placeholder: "Digite o gênero" },
        { name: "bpm", label: "BPM", placeholder: "80", type: "number" },
        { name: "originalArtist", label: "Artista Original", placeholder: "Digite o artista original" },
        { name: "comments", label: "Comentários", placeholder: "Digite os comentários" },
        { name: "copyright", label: "Copyright", placeholder: "Digite o copyright" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await window.electronAPI.writetags(file, formValues); // Envia os dados para o main
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar as tags!");
        }
    };
    return (
        <>
            <form className="space-y-2 flex flex-wrap w-2/1 lg:w-2/3" onSubmit={handleSubmit}>
                {fields.map(({ name, label, placeholder, type }) => (
                    <Input
                        key={name}
                        value={formValues[name as keyof Itags]?.toString()}
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        type={type || "text"}
                        fullWidth
                        size="sm"
                        onChange={handleChange}
                    />
                ))}

                <Spacer y={1} />
                <Button color="warning" type="submit" fullWidth>
                    <FaSave /> SALVAR
                </Button>
                <Button onClick={()=> {
                    navigate("/home");
                }} className="text-gray-400 hover:bg-amber-500/75" variant="light" type="button" fullWidth>
                    <BiArrowBack /> Voltar
                </Button>
            </form>
        </>
    );
}

export default Form;
