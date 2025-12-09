import Section from './Section';
import './Main.css';

interface SectionProps {
    sectionNumber: number;
}
const Main: React.FC<SectionProps> = ({ sectionNumber }) => {
    // sectionNumberの数だけSectionコンポーネントを生成する処理
    const sections = Array.from({ length: sectionNumber }, (_, index) => {
        const id = index + 1; // SectionのIDを1から始める

        return (
            <Section
                key={id}
                id={id}
                content={`これは ${id} 番目の動的コンテンツブロックです。`}
            />
        );
    });
    return (
        <main className="app-main">

            {/* mainタグ内の最上部 */}
            <p>【表示場所: メイン領域開始】</p>
            {sections}
            <p>【表示場所: メイン領域終了】</p>
        </main>
    );
};


export default Main;