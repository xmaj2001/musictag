import { Button, Input, Modal, ModalBody, ModalContent, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FaDownload, FaUpload } from "react-icons/fa6";

const isUpload = (status: StatusSubmit): boolean => {
    if (status == StatusSubmit.UPLOAD)
        return (true)
    return (false)
}

enum StatusSubmit {
    NONE,
    UPLOAD,
    DOWNLOAD
}

function Form() {
    const [statu, setStatus] = useState<StatusSubmit>(StatusSubmit.UPLOAD)
    return (
        <>
            <form className="space-y-2 flex flex-wrap w-2/1 lg:w-2/3">
                <Input name='title' label="Título" placeholder="Digite o título" fullWidth size='sm' />
                <Input name='artist' label="Artista" placeholder="Digite o artista" fullWidth size='sm' />
                <Input name='album' label="Álbum" placeholder="Digite o álbum" fullWidth size='sm' />
                <Input name='year' label="Ano" type="number" placeholder="2023" fullWidth size='sm' />
                <Input name='genre' label="Gênero" placeholder="Digite o gênero" fullWidth size='sm' />
                <Input name='composer' label="Compositor" placeholder="Digite o compositor" fullWidth size='sm' />
                <Input name='producer' label="Produtora" placeholder="Digite a produtora"  fullWidth size='sm' />
                <Input name='bpm' label="BPM" type="number" placeholder="80" fullWidth size='sm' />
                <Input name='copyright' label="Copyright" placeholder="Digite o copyright" fullWidth size='sm' />
                <Spacer y={1} />
                <Button color="warning" className={statu == StatusSubmit.DOWNLOAD ? `bg-neutral-900 text-orange-400` : ``} type="submit" fullWidth>
                    {isUpload(statu) ? <FaUpload /> : <FaDownload />}
                    {isUpload(statu) ? "UPLOAD FILE" : "DOWNLOAD"}
                </Button>
            </form>
        </>
    );
}

export default Form;