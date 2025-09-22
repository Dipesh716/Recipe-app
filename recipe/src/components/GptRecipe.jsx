import ReactMarkdown from "react-markdown";

export default function GptRecipe(props) {
  return (
    <section className="suggested-recipe-container">
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
