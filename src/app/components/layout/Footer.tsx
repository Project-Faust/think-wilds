export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <p>Created by Project-Faust {new Date().getFullYear()}</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            </nav>
        </footer>
    )
};