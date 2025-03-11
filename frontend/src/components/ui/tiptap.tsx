import StarterKit from "@tiptap/starter-kit";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return (
    <div className="">
      <div className="flex flex-wrap bg-white ">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("strike") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`${
            editor.isActive("code") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${
            editor.isActive("paragraph") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 1 })
              ? "bg-orange-200 text-orange-950"
              : ""
          } my-button`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 2 })
              ? "bg-orange-200 text-orange-950"
              : ""
          } my-button`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "bg-orange-200 text-orange-950"
              : ""
          } my-button`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${
            editor.isActive("codeBlock") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${
            editor.isActive("blockquote") ? "bg-orange-200 text-orange-950" : ""
          } my-button`}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="my-button"
        >
          Horizontal rule
        </button>

        <button
          className="my-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          className="my-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().run()}
          className={`${
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "bg-orange-200 text-orange-950"
              : ""
          } my-button`}
        >
          Purple
        </button>
      </div>
    </div>
  );
};

// define your extension array
// const extensions = [
//   StarterKit,
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle,
// ];
const extensions = [
  // Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle,
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "text-xl font-bold capitalize",
        levels: [2],
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc ml-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal ml-2",
      },
    },
  }),
];

const Tiptap = ({
  setContent,
  content,
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}) => {
  // const editor = useEditor({
  //   extensions,
  //   content,
  // });

  return (
    <div className="">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => {
          setContent(editor.getHTML());
        }}
      ></EditorProvider>
    </div>
  );
};

export default Tiptap;
