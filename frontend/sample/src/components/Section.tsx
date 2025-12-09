// src/components/Section.tsx

import './Section.css';

interface SectionProps {
    id: number;
    content: string;
}

const Section: React.FC<SectionProps> = ({ id, content }) => {
    // <section>タグで囲まれた内容が、メインコンテンツの中に出力されます
    return (
        <section className="app-section">
            <p>【表示場所: セクション領域開始】</p>
            <h2>セクション {id}</h2>
            <p>{content}</p>
            <p>【表示場所: セクション領域開始】</p>
        </section>
    );
};

export default Section;