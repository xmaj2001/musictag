import Icover from "./Icover";
import IRawTags from "./IRawTags";

export default interface Itags {
    title: string;
    artist: string;
    originalArtist?: string;
    album: string;
    year: string;
    genre: string;
    comments?: string;
    composer?: string;
    producer?: string;
    bpm: string;
    copyright?: string;
    image?: Icover | null;
    raw?: IRawTags | null;
    cover: string;
    lyrics?: string;
}
