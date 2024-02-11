import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo2 from "../public/LOGO 2.png";
import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-center  border-b">
        <div className="flex items-center gap-5 ">
          <span className="flex items-center text-muted-foreground">
            developed by
            <Image
              width={70}
              height={70}
              alt="logo"
              src={logo2}
              className="rounded-md"
            />
          </span>
          <Separator orientation="vertical" className="h-10" />
          <Button variant={"outline"}>
            <Github /> github
          </Button>
        </div>
      </header>

      <main className=" flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className=" grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-6 border-zinc-600"
              placeholder="PROMPT"
            />
            <Textarea
              className="resize-none p-4 leading-6 border-zinc-600"
              placeholder="RESULT"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            remember you can use the variable in your prompt to add the content
            of the transcript of the selected video
          </p>
        </div>
        <aside className="w-80  space-y-6">
          <form action="" className="space-y-6">
            <label
              htmlFor="video"
              className="border flex items-center justify-center rounded-md aspect-video cursor-pointer border-dashed flex-col text-sm gap-2 hover:bg-primary/5"
            >
              <FileVideo />
              upload video
            </label>
            <input
              type="file"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />
            <Separator />
            <div className="space-y-1">
              <Label htmlFor="transcription_prompt ">
                transcription prompt{" "}
              </Label>
              <Textarea
                id="transcription_prompt"
                className="min-h-20 leading-6 resize-none"
                placeholder="Include keywords mentioned in the video separated by commas (,)"
              />
            </div>
            <Button type="submit" className="w-full">
              Upload video <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <Separator />
          <form className="space-y-6">
            <div className="space-y-1">
              <Label>Choose model</Label>

              <Select disabled defaultValue="gpt-turbo 3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-turbo 3.5">gpt-turbo 3.5</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs  text-muted-foreground">
                You will be able to customize this option soon
              </span>
            </div>
            <Separator />
            <div className="space-y-1">
              <Label>Choose prompt</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Youtube tittle">Youtube tittle</SelectItem>
                  <SelectItem value="Youtube description">
                    Youtube description
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label> Creativity</Label>
              <Slider min={0} max={1} step={0.1} />
              <span className=" block text-xs  text-muted-foreground leading-none">
                Higher values make the results more creative but less accurate
              </span>
            </div>
            <Separator />
            <Button type="submit" className="w-full">
              Play <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
