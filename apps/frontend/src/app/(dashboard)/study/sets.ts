import { type CardSet } from "./page";

export const sets: CardSet[] = [
  {
    title: "Bill of Rights Amendments",
    slug: "bor-amendments",
    description: "Flashcards for each of the amendments in the Bill of Rights",
    cards: [
      {
        front: {
          heading: "1st Amendment",
        },
        back: {
          heading: "Freedom of Expression",
          description:
            "Protects the freedom of speech, religion, press, assembly, and the right to petition the government for a redress of grievances.",
        },
      },
      {
        front: {
          heading: "2nd Amendment",
        },
        back: {
          heading: "Right to Bear Arms",
          description:
            "Protects the right of the people to keep and bear arms.",
        },
      },
      {
        front: {
          heading: "3rd Amendment",
        },
        back: {
          heading: "Protection from Quartering",
          description:
            "Prohibits the forced quartering of soldiers in private homes during peacetime without the owner's consent.",
        },
      },
      {
        front: {
          heading: "4th Amendment",
        },
        back: {
          heading: "Protection from Unreasonable Searches and Seizures",
          description:
            "Protects against unreasonable searches and seizures and requires a judicially sanctioned warrant supported by probable cause for such actions.",
        },
      },
      {
        front: {
          heading: "5th Amendment",
        },
        back: {
          heading: "Rights of the Accused",
          description:
            "Protects individuals from being compelled to be witnesses against themselves in criminal cases and prohibits double jeopardy and deprivation of life, liberty, or property without due process of law.",
        },
      },
      {
        front: {
          heading: "6th Amendment",
        },
        back: {
          heading: "Right to a Fair Trial",
          description:
            "Guarantees the right to a fair and speedy public trial by an impartial jury, including the right to be informed of the nature and cause of the accusation, to confront witnesses, and to have the assistance of counsel.",
        },
      },
      {
        front: {
          heading: "7th Amendment",
        },
        back: {
          heading: "Trial by Jury in Civil Cases",
          description:
            "Provides for the right to trial by jury in certain civil cases, according to the rules of common law.",
        },
      },
      {
        front: {
          heading: "8th Amendment",
        },
        back: {
          heading: "Protection from Cruel and Unusual Punishment",
          description:
            "Prohibits the imposition of excessive bail or fines and cruel and unusual punishments.",
        },
      },
      {
        front: {
          heading: "9th Amendment",
        },
        back: {
          heading: "Unenumerated Rights",
          description:
            "Affirms that the listing of individual rights in the Constitution and Bill of Rights does not deny or disparage other rights retained by the people.",
        },
      },
      {
        front: {
          heading: "10th Amendment",
        },
        back: {
          heading: "States' Rights",
          description:
            "Reserves powers not delegated to the federal government to the states or the people.",
        },
      },
    ],
  },
  {
    title: "Freedom of Speech Limitations",
    description:
      "Key limitations on the freedom of speech in the United States",
    slug: "freedom-of-speech-limitations",
    cards: [
      {
        front: {
          heading: "Clear and Present Danger Test",
          subheading: "Case: Schenck v. United States (1919)",
        },
        back: {
          heading: "Imminent Lawless Action",
          description:
            "Speech can be restricted if it poses a clear and present danger of imminent lawless action. This test considers whether the words create a threat that society has a right to prevent.",
        },
      },
      {
        front: {
          heading: "Hate Speech",
          subheading: "No specific case (general principle)",
        },
        back: {
          heading: "Protected vs. Unprotected Speech",
          description:
            "While hate speech is generally protected, speech that incites violence, discrimination, or 'fighting words' may face restrictions. The distinction lies in the potential harm caused by the speech.",
        },
      },
      {
        front: {
          heading: "Incitement Test",
          subheading: "Case: Brandenburg v. Ohio (1969)",
        },
        back: {
          heading: "Imminent Lawless Action",
          description:
            "Sets the standard for restricting speech that advocates illegal conduct. Speech can only be prohibited if it is directed at inciting or producing imminent lawless action and is likely to incite or produce such action.",
        },
      },
      {
        front: {
          heading: "Commercial Speech",
          subheading:
            "Case: Central Hudson Gas & Electric Corp. v. Public Service Commission (1980)",
        },
        back: {
          heading: "Intermediate Scrutiny",
          description:
            "Commercial speech (advertising) is protected but subject to intermediate scrutiny. Restrictions must advance a substantial government interest, directly advance that interest, and not be more extensive than necessary.",
        },
      },
    ],
  },
  {
    title: "Landmark Supreme Court Cases",
    slug: "court-cases",
    description:
      "Key Supreme Court cases that have shaped legal precedent in the United States.",
    cards: [
      {
        front: {
          heading: "Marbury v. Madison",
          subheading: "1803",
        },
        back: {
          heading: "Establishment of Judicial Review",
          description:
            "In 1803, Marbury v. Madison established the principle of judicial review, empowering the Supreme Court to declare laws unconstitutional. This landmark case played a crucial role in defining the separation of powers within the federal government.",
        },
      },
      {
        front: {
          heading: "McCulloch v. Maryland",
          subheading: "1819",
        },
        back: {
          heading: "Federal Supremacy and Necessary and Proper Clause",
          description:
            "In 1819, McCulloch v. Maryland confirmed the supremacy of federal laws over state laws and established the necessary and proper clause. This decision had a lasting impact on the balance of power between the federal government and individual states.",
        },
      },
      {
        front: {
          heading: "Brown v. Board of Education",
          subheading: "1954",
        },
        back: {
          heading: "Overturning 'Separate but Equal'",
          description:
            "Brown v. Board of Education (1954) overturned the 'separate but equal' doctrine, marking a historic step towards desegregation in public schools. The case played a pivotal role in the civil rights movement and the pursuit of equality.",
        },
      },
      {
        front: {
          heading: "Gideon v. Wainwright",
          subheading: "1963",
        },
        back: {
          heading: "Right to Counsel",
          description:
            "Gideon v. Wainwright (1963) established the right to counsel for criminal defendants, ensuring that even those who couldn't afford an attorney would receive a fair trial. This decision significantly impacted the criminal justice system in the United States.",
        },
      },
      {
        front: {
          heading: "Tinker v. Des Moines",
          subheading: "1969",
        },
        back: {
          heading: "Protection of Student Speech",
          description:
            "Tinker v. Des Moines (1969) protected students' rights to free speech in public schools. The case set a precedent for student expression and clarified the limitations that schools could place on individual rights.",
        },
      },
      {
        front: {
          heading: "United States v. Lopez",
          subheading: "1995",
        },
        back: {
          heading: "Limiting Federal Power",
          description:
            "United States v. Lopez (1995) limited the scope of the Commerce Clause, asserting that the federal government's authority is not unlimited. The decision clarified the boundaries of federal power in regulating activities within the states.",
        },
      },
      {
        front: {
          heading: "Baker v. Carr",
          subheading: "1962",
        },
        back: {
          heading: "One Person, One Vote",
          description:
            "Baker v. Carr (1962) established the principle of 'one person, one vote' in the apportionment of legislative districts. The case aimed to address the issue of malapportionment and ensure equal representation for all citizens.",
        },
      },
      {
        front: {
          heading: "Engel v. Vitale",
          subheading: "1962",
        },
        back: {
          heading: "Prohibition of School Prayer",
          description:
            "Engel v. Vitale (1962) struck down prayer in public schools, ruling it unconstitutional under the First Amendment's Establishment Clause. The decision reinforced the separation of church and state in public education.",
        },
      },
      {
        front: {
          heading: "New York Times v. US",
          subheading: "1971",
        },
        back: {
          heading: "Freedom of the Press",
          description:
            "New York Times v. US (1971) upheld the freedom of the press, preventing prior restraint on the publication of classified documents. The case affirmed the importance of a free and independent press in a democratic society.",
        },
      },
      {
        front: {
          heading: "Schenck v. US",
          subheading: "1919",
        },
        back: {
          heading: "Clear and Present Danger Test",
          description:
            "Schenck v. US (1919) established the 'clear and present danger' test, limiting free speech during wartime when it poses a threat to national security. The case set a precedent for balancing free speech rights with the need for national security.",
        },
      },
      {
        front: {
          heading: "McDonald v. Chicago",
          subheading: "2010",
        },
        back: {
          heading: "Application of Second Amendment to States",
          description:
            "McDonald v. Chicago (2010) applied the Second Amendment to the states, affirming an individual's right to bear arms for self-defense. The decision had significant implications for gun rights and regulations at the state level.",
        },
      },
      {
        front: {
          heading: "Shaw v. Reno",
          subheading: "1993",
        },
        back: {
          heading: "Racial Gerrymandering",
          description:
            "Shaw v. Reno (1993) addressed racial gerrymandering, ruling that race cannot be the primary factor in the drawing of electoral district lines. The case aimed to prevent the manipulation of electoral boundaries based on race.",
        },
      },
      {
        front: {
          heading: "Wisconsin v. Yoder",
          subheading: "1972",
        },
        back: {
          heading: "Freedom of Religion",
          description:
            "Wisconsin v. Yoder (1972) protected the right to freedom of religion, allowing Amish parents to withdraw their children from public school for religious reasons. The decision recognized the importance of accommodating religious practices within the legal framework.",
        },
      },
    ],
  },
  {
    title: "Ecology and Biology Concepts",
    slug: "ecology-biology-concepts",
    description: "Flashcards on various ecological and biological terms",
    cards: [
      {
        front: {
          heading: "Biosphere",
        },
        back: {
          heading: "Global Ecosystem",
          description: "Earth's life-supporting zone",
        },
      },
      {
        front: {
          heading: "Ecosystem",
        },
        back: {
          heading: "Biological Community",
          description: "Living organisms and their environment",
        },
      },
      {
        front: {
          heading: "Communities",
        },
        back: {
          heading: "Interacting Species",
          description: "Different populations in an area",
        },
      },
      {
        front: {
          heading: "Population",
        },
        back: {
          heading: "Group of Organisms",
          description: "Same species in a specific area",
        },
      },
      {
        front: {
          heading: "Organism Producers",
        },
        back: {
          heading: "Autotrophs",
          description: "Self-sustaining organisms",
        },
      },
      {
        front: {
          heading: "Autotrophs",
        },
        back: {
          heading: "Self-Feeders",
          description: "Organisms producing own food",
        },
      },
      {
        front: {
          heading: "Chemotrophs",
        },
        back: {
          heading: "Chemical Energy Consumers",
          description: "Organisms obtaining energy from chemicals",
        },
      },
      {
        front: {
          heading: "Heterotrophs",
        },
        back: {
          heading: "Consumers",
          description: "Organisms relying on others for food",
        },
      },
      {
        front: {
          heading: "Herbivore",
        },
        back: {
          heading: "Plant Eater",
          description: "Organism consuming plants",
        },
      },
      {
        front: {
          heading: "Carnivore",
        },
        back: {
          heading: "Meat Eater",
          description: "Organism consuming other animals",
        },
      },
      {
        front: {
          heading: "Scavenger/Detritivore",
        },
        back: {
          heading: "Carrion Eater",
          description: "Organism consuming dead organisms",
        },
      },
      {
        front: {
          heading: "Omnivore",
        },
        back: {
          heading: "Eats Both Plants and Animals",
          description: "Organism consuming both plants and animals",
        },
      },
      {
        front: {
          heading: "Decomposer",
        },
        back: {
          heading: "Breaks Down Dead Matter",
          description: "Organism recycling nutrients from dead organisms",
        },
      },
      {
        front: {
          heading: "10% Law",
        },
        back: {
          heading: "Energy Transfer Rule",
          description: "10% energy transfer between trophic levels",
        },
      },
      {
        front: {
          heading: "Birth Rate",
        },
        back: {
          heading: "Number of Births",
          description: "Rate of new individuals born",
        },
      },
      {
        front: {
          heading: "Death Rate",
        },
        back: {
          heading: "Number of Deaths",
          description: "Rate of individuals dying",
        },
      },
      {
        front: {
          heading: "Immigration",
        },
        back: {
          heading: "Inward Migration",
          description: "Movement into a population or area",
        },
      },
      {
        front: {
          heading: "Emigration",
        },
        back: {
          heading: "Outward Migration",
          description: "Movement out of a population or area",
        },
      },
      {
        front: {
          heading: "Limiting Factor",
        },
        back: {
          heading: "Population Growth Constraint",
          description: "Factor limiting population size",
        },
      },
      {
        front: {
          heading: "Density-Dependent Factor",
        },
        back: {
          heading: "Impact Increases with Density",
          description: "Factor affecting population based on density",
        },
      },
      {
        front: {
          heading: "Density-Independent Factor",
        },
        back: {
          heading: "Impact Unrelated to Density",
          description: "Factor affecting population regardless of density",
        },
      },
      {
        front: {
          heading: "Carrying Capacity (K)",
        },
        back: {
          heading: "Max Sustainable Population",
          description: "Maximum population size an environment can support",
        },
      },
      {
        front: {
          heading: "Exponential Growth",
        },
        back: {
          heading: "Rapid Population Increase",
          description: "Population growth without limiting factors",
        },
      },
      {
        front: {
          heading: "Logistic Growth",
        },
        back: {
          heading: "S-Shaped Growth Curve",
          description: "Population growth with limiting factors",
        },
      },
      {
        front: {
          heading: "Water Cycle",
        },
        back: {
          heading: "Hydrological Cycle",
          description: "Movement of water through Earth's systems",
        },
      },
      {
        front: {
          heading: "Nitrogen Cycle",
        },
        back: {
          heading: "Nitrogen Movement in Ecosystems",
          description: "Cycling of nitrogen through ecosystems",
        },
      },
      {
        front: {
          heading: "Phosphorus Cycle",
        },
        back: {
          heading: "Phosphorus Movement in Ecosystems",
          description: "Cycling of phosphorus through ecosystems",
        },
      },
      {
        front: {
          heading: "Carbon Cycles",
        },
        back: {
          heading: "Carbon Movement in Ecosystems",
          description: "Cycling of carbon through ecosystems",
        },
      },
      {
        front: {
          heading: "Carbon Sink",
        },
        back: {
          heading: "Carbon Absorption Site",
          description: "Area storing more carbon than it releases",
        },
      },
      {
        front: {
          heading: "Carbon Source",
        },
        back: {
          heading: "Carbon Emission Site",
          description: "Area releasing more carbon than it absorbs",
        },
      },
      {
        front: {
          heading: "Flux",
        },
        back: {
          heading: "Flow Rate",
          description: "Rate of movement between carbon reservoirs",
        },
      },
      {
        front: {
          heading: "Phytoplankton",
        },
        back: {
          heading: "Microscopic Marine Plants",
          description: "Floating marine plants crucial to ecosystems",
        },
      },
      {
        front: {
          heading: "Diatoms",
        },
        back: {
          heading: "Silica-Shelled Algae",
          description: "Microscopic algae with intricate shells",
        },
      },
      {
        front: {
          heading: "Dinoflagellates",
        },
        back: {
          heading: "Flagellated Protists",
          description: "Microorganisms with flagella, often in plankton",
        },
      },
      {
        front: {
          heading: "Oil",
        },
        back: {
          heading: "Petroleum",
          description: "Fossil fuel formed from organic matter",
        },
      },
      {
        front: {
          heading: "Natural Gas",
        },
        back: {
          heading: "Methane Resource",
          description: "Fossil fuel in gaseous form",
        },
      },
      {
        front: {
          heading: "Coal",
        },
        back: {
          heading: "Solid Fossil Fuel",
          description: "Carbon-rich fossil fuel",
        },
      },
      {
        front: {
          heading: "Greenhouse Gas",
        },
        back: {
          heading: "Heat-Trapping Gas",
          description: "Gas contributing to the greenhouse effect",
        },
      },
      {
        front: {
          heading: "Greenhouse Effect",
        },
        back: {
          heading: "Heat Retention by Atmosphere",
          description: "Trapping of heat in the Earth's atmosphere",
        },
      },
      {
        front: {
          heading: "EM Spectrum",
        },
        back: {
          heading: "Electromagnetic Spectrum",
          description: "Range of electromagnetic waves",
        },
      },
      {
        front: {
          heading: "Climate Change",
        },
        back: {
          heading: "Global Climate Alteration",
          description: "Long-term changes in Earth's climate",
        },
      },
      {
        front: {
          heading: "Albedo Effect",
        },
        back: {
          heading: "Reflectivity Impact",
          description: "Surface reflectivity affecting temperature",
        },
      },
      {
        front: {
          heading: "Graph: CO2 and Temp",
        },
        back: {
          heading: "Climate Trends",
          description:
            "Graph showing CO2 and temperature correlation over 800,000 years",
        },
      },
      {
        front: {
          heading: "LUCA",
        },
        back: {
          heading: "Last Universal Common Ancestor",
          description: "Hypothetical common ancestor of all life",
        },
      },
      {
        front: {
          heading: "3 Domains",
        },
        back: {
          heading: "Archaea, Bacteria, Eukarya",
          description: "Classification of life into three major groups",
        },
      },
      {
        front: {
          heading: "Homologous Structures",
        },
        back: {
          heading: "Similar Anatomical Features",
          description: "Structures with common evolutionary origin",
        },
      },
      {
        front: {
          heading: "Analogous Structures",
        },
        back: {
          heading: "Similar Function, Different Origin",
          description:
            "Structures with similar function but different evolutionary origin",
        },
      },
      {
        front: {
          heading: "Vestigial Structures",
        },
        back: {
          heading: "Functionless Remnants",
          description: "Structures with no apparent function",
        },
      },
      {
        front: {
          heading: "Fossils",
        },
        back: {
          heading: "Preserved Remains",
          description: "Remnants of past life, often in rock",
        },
      },
      {
        front: {
          heading: "Echinoderms and Arthropods",
        },
        back: {
          heading: "Invertebrate Phyla",
          description: "Two diverse animal phyla",
        },
      },
      {
        front: {
          heading: "Genome",
        },
        back: {
          heading: "Organism's Genetic Material",
          description: "Complete set of genes in an organism",
        },
      },
      {
        front: {
          heading: "Chromosome",
        },
        back: {
          heading: "Genetic Information Carrier",
          description: "Thread-like structure carrying genes",
        },
      },
      {
        front: {
          heading: "Gene",
        },
        back: {
          heading: "Genetic Code Segment",
          description: "Basic unit of heredity",
        },
      },
      {
        front: {
          heading: "Nucleotide",
        },
        back: {
          heading: "DNA Building Block",
          description: "Basic unit of DNA and RNA",
        },
      },
      {
        front: {
          heading: "Heterozygous and Homozygous Alleles",
        },
        back: {
          heading: "Different and Same Alleles",
          description: "Allele combinations in genetics",
        },
      },
      {
        front: {
          heading: "Allele Frequency",
        },
        back: {
          heading: "Relative Allele Abundance",
          description: "Proportion of an allele in a population",
        },
      },
      {
        front: {
          heading: "Genotype",
        },
        back: {
          heading: "Genetic Makeup",
          description: "Genetic constitution of an organism",
        },
      },
      {
        front: {
          heading: "Phenotype",
        },
        back: {
          heading: "Observable Traits",
          description: "Physical and biochemical features of an organism",
        },
      },
      {
        front: {
          heading: "Punnett Square",
        },
        back: {
          heading: "Genetic Cross Diagram",
          description: "Tool for predicting offspring genotypes",
        },
      },
      {
        front: {
          heading: "Blood Types",
        },
        back: {
          heading: "A, B, AB, O",
          description: "Human blood group classifications",
        },
      },
      {
        front: {
          heading: "Evolution",
        },
        back: {
          heading: "Species Change Over Time",
          description: "Gradual change in organisms over generations",
        },
      },
      {
        front: {
          heading: "Mutation",
        },
        back: {
          heading: "Genetic Change",
          description: "Alteration in DNA sequence",
        },
      },
      {
        front: {
          heading: "Variation",
        },
        back: {
          heading: "Genetic Diversity",
          description: "Differences in traits within a population",
        },
      },
      {
        front: {
          heading: "Selection or Drift",
        },
        back: {
          heading: "Evolutionary Mechanisms",
          description: "Processes influencing allele frequencies",
        },
      },
      {
        front: {
          heading: "Lithosphere",
        },
        back: {
          heading: "Earth's Solid Outer Shell",
          description: "Rigid outer layer including the crust and upper mantle",
        },
      },
      {
        front: {
          heading: "Diatoms",
        },
        back: {
          heading: "Silica-Shelled Algae",
          description: "Microscopic algae with intricate shells",
        },
      },
      {
        front: {
          heading: "Dinoflagellates",
        },
        back: {
          heading: "Flagellated Protists",
          description: "Microorganisms with flagella, often in plankton",
        },
      },
      {
        front: {
          heading: "EM Spectrum",
        },
        back: {
          heading: "Electromagnetic Spectrum",
          description: "Range of electromagnetic waves",
        },
      },
    ],
  },
  {
    title: "Polyatomic Ions Flashcards",
    slug: "polyatomic-ions",
    description:
      "Flashcards for various polyatomic ions with formulas and descriptions.",
    cards: [
      {
        front: {
          heading: "Ammonium",
          subheading: "",
        },
        back: {
          heading: "NH4-",
          description: "Commonly found in fertilizers for plant growth.",
        },
      },
      {
        front: {
          heading: "Nitrite",
          subheading: "",
        },
        back: {
          heading: "NO2-",
          description:
            "Used in food preservation and may play a role in biological signaling.",
        },
      },
      {
        front: {
          heading: "Nitrate",
          subheading: "",
        },
        back: {
          heading: "NO3-",
          description:
            "Common component of fertilizers, promoting plant growth.",
        },
      },
      {
        front: {
          heading: "Hydroxide",
          subheading: "",
        },
        back: {
          heading: "OH-",
          description:
            "Present in alkaline solutions; used in the chemical industry.",
        },
      },
      {
        front: {
          heading: "Cyanide",
          subheading: "",
        },
        back: {
          heading: "CN-",
          description:
            "Infamous for its toxicity; used in certain industrial processes.",
        },
      },
      {
        front: {
          heading: "Permanganate",
          subheading: "",
        },
        back: {
          heading: "MnO4-",
          description:
            "Utilized as a strong oxidizing agent in various chemical applications.",
        },
      },
      {
        front: {
          heading: "Bicarbonate",
          subheading: "",
        },
        back: {
          heading: "HCO3-",
          description: "Involved in the regulation of pH in the human body.",
        },
      },
      {
        front: {
          heading: "Hypochlorite",
          subheading: "",
        },
        back: {
          heading: "ClO-",
          description:
            "Commonly used in household bleach for disinfection purposes.",
        },
      },
      {
        front: {
          heading: "Chlorite",
          subheading: "",
        },
        back: {
          heading: "ClO2-",
          description:
            "Used as a disinfectant and in water treatment processes.",
        },
      },
      {
        front: {
          heading: "Chlorate",
          subheading: "",
        },
        back: {
          heading: "ClO3-",
          description:
            "Involved in the production of certain chemicals and disinfectants.",
        },
      },
      {
        front: {
          heading: "Perchlorate",
          subheading: "",
        },
        back: {
          heading: "ClO4-",
          description: "Used in rocket propellants and fireworks.",
        },
      },
      {
        front: {
          heading: "Bromate",
          subheading: "",
        },
        back: {
          heading: "BrO3-",
          description: "Commonly used in bread making as a flour improver.",
        },
      },
      {
        front: {
          heading: "Iodate",
          subheading: "",
        },
        back: {
          heading: "IO3-",
          description: "Used as a dough conditioner in the baking industry.",
        },
      },
      {
        front: {
          heading: "Periodate",
          subheading: "",
        },
        back: {
          heading: "IO4-",
          description: "Involved in organic synthesis and as a disinfectant.",
        },
      },
      {
        front: {
          heading: "Acetate",
          subheading: "",
        },
        back: {
          heading: "C2H3O2-",
          description:
            "Commonly used in the textile and pharmaceutical industries.",
        },
      },
      {
        front: {
          heading: "Dihydrogen Phosphate",
          subheading: "",
        },
        back: {
          heading: "H2PO4-",
          description:
            "Involved in biological processes and as a buffering agent.",
        },
      },
      {
        front: {
          heading: "Carbonate",
          subheading: "",
        },
        back: {
          heading: "CO3-2",
          description:
            "Used in the production of glass, ceramics, and as a stabilizing agent.",
        },
      },
      {
        front: {
          heading: "Sulfite",
          subheading: "",
        },
        back: {
          heading: "SO3-2",
          description:
            "Used as a preservative in the food and beverage industry.",
        },
      },
      {
        front: {
          heading: "Sulfate",
          subheading: "",
        },
        back: {
          heading: "SO4-2",
          description:
            "Commonly found in fertilizers and as a coagulating agent.",
        },
      },
      {
        front: {
          heading: "Thiosulfate",
          subheading: "",
        },
        back: {
          heading: "S2O3-2",
          description: "Used in photography as a fixing agent.",
        },
      },
      {
        front: {
          heading: "Peroxide",
          subheading: "",
        },
        back: {
          heading: "O2-2",
          description:
            "Used as a bleach and antiseptic in various applications.",
        },
      },
      {
        front: {
          heading: "Chromate",
          subheading: "",
        },
        back: {
          heading: "CrO4-2",
          description:
            "Used in the production of pigments and as a corrosion inhibitor.",
        },
      },
      {
        front: {
          heading: "Dichromate",
          subheading: "",
        },
        back: {
          heading: "CrO7-2",
          description:
            "Utilized in the leather tanning process and as a corrosion inhibitor.",
        },
      },
      {
        front: {
          heading: "Hydrogen Phosphate",
          subheading: "",
        },
        back: {
          heading: "HPO4-2",
          description:
            "Involved in biological processes and as a buffering agent.",
        },
      },
      {
        front: {
          heading: "Phosphate",
          subheading: "",
        },
        back: {
          heading: "PO4-3",
          description:
            "Critical for energy transfer in living organisms and DNA structure.",
        },
      },
      {
        front: {
          heading: "Arsenate",
          subheading: "",
        },
        back: {
          heading: "AsO4-3",
          description: "Used as a herbicide and in the preservation of wood.",
        },
      },
      {
        front: {
          heading: "Hydrogen Sulfate",
          subheading: "",
        },
        back: {
          heading: "HSO4-",
          description:
            "Used in the production of fertilizers and as a pH regulator.",
        },
      },
      {
        front: {
          heading: "Oxalate",
          subheading: "",
        },
        back: {
          heading: "C2O4-2",
          description:
            "Found in some plants and can form kidney stones in humans.",
        },
      },
      {
        front: {
          heading: "Citrate",
          subheading: "",
        },
        back: {
          heading: "C6H5O7-3",
          description:
            "Used as a food additive and in the pharmaceutical industry.",
        },
      },
      {
        front: {
          heading: "Oxygen",
          subheading: "",
        },
        back: {
          heading: "O2",
          description: "Essential for respiration and combustion processes.",
        },
      },
      {
        front: {
          heading: "Nitrogen",
          subheading: "",
        },
        back: {
          heading: "N2",
          description:
            "Constitutes a significant portion of Earth's atmosphere; essential for life.",
        },
      },
      {
        front: {
          heading: "Hydrogen",
          subheading: "",
        },
        back: {
          heading: "H2",
          description:
            "Commonly used in various industrial processes and as a fuel.",
        },
      },
      {
        front: {
          heading: "Fluorine",
          subheading: "",
        },
        back: {
          heading: "F2",
          description:
            "Used in the production of fluoridated water and various chemicals.",
        },
      },
      {
        front: {
          heading: "Chlorine",
          subheading: "",
        },
        back: {
          heading: "Cl2",
          description:
            "Widely used in water purification and as a disinfectant.",
        },
      },
      {
        front: {
          heading: "Bromine",
          subheading: "",
        },
        back: {
          heading: "Br2",
          description: "Used in flame retardants, dyes, and pharmaceuticals.",
        },
      },
      {
        front: {
          heading: "Iodine",
          subheading: "",
        },
        back: {
          heading: "I2",
          description:
            "Used in medicine, photography, and as a dietary supplement.",
        },
      },
    ],
  },
];
