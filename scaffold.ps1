$sections = @("Hero", "AboutUs", "Services", "Trainers", "Membership", "Programs", "Gallery", "Transformation", "BmiCalculator", "Contact")
$layout = @("Navbar", "Footer")

New-Item -ItemType Directory -Force -Path "src/components/sections"
New-Item -ItemType Directory -Force -Path "src/components/layout"

foreach ($sec in $sections) {
    $content = "export default function $sec() { return <section id=`"$($sec.ToLower())`"><h2>$sec</h2></section>; }"
    Set-Content -Path "src/components/sections/$sec.jsx" -Value $content
    Set-Content -Path "src/components/sections/$sec.module.css" -Value ""
}

foreach ($lay in $layout) {
    $content = "export default function $lay() { return <header><h2>$lay</h2></header>; }"
    if ($lay -eq "Footer") {
        $content = "export default function $lay() { return <footer><h2>$lay</h2></footer>; }"
    }
    Set-Content -Path "src/components/layout/$lay.jsx" -Value $content
    Set-Content -Path "src/components/layout/$lay.module.css" -Value ""
}
