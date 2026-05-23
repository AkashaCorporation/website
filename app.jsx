/* eslint-disable */
// ============================================================
// AKASHA CORP — App entry
// ============================================================

function App() {
  return (
    <div data-screen-label="Akasha Corp" style={{minHeight:"100vh"}}>
      <div className="grain"/>
      <Navbar/>
      <Hero/>
      <Marquee/>
      <HexCoreIDE/>
      <QuoteBand/>
      <Arsenal/>
      <Roadmap/>
      <Research/>
      <Team/>
      <Practice/>
      <Footer/>
      <Dock/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
