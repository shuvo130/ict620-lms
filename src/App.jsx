import { useEffect, useRef, useState } from 'react'
import './App.css'

const weeks = [
  { title: 'Week 1', items: [['High', 'Lecture1: Descriptive Statistics', 'PDF'], ['High', 'Workshop 1', 'PDF'], ['High', 'Tutorial 1', 'PDF'], ['High', 'Quiz 1', 'Quiz'], ['Medium', 'Pulse Data', 'File'], ['Low', 'Sampling code', 'File']] },
  { title: 'Week 2', items: [['High', 'Lecture2: Resampling Methods', 'PDF'], ['High', 'Workshop 2', 'PDF'], ['High', 'Tutorial 2', 'PDF'], ['Medium', 'Tutorial 2 Solutions', 'PDF'], ['Medium', 'R code week 2', 'R'], ['Medium', 'SBMA dataset', 'CSV'], ['High', 'Quiz 2', 'Quiz']] },
  { title: 'Week 3', items: [['High', 'Lecture 3: Data visualisation', 'PDF'], ['Medium', 'Workshop 3', 'PDF']] },
  { title: 'Week 4', items: [['High', 'Lecture 4: Probability', 'PDF'], ['Medium', 'Workshop 4', 'PDF']] },
  { title: 'Week 5', items: [['High', 'Lecture 5: Statistical inference', 'PDF']] },
  { title: 'Week 6 (non-teaching week)', items: [] },
  { title: 'Week 7', items: [['High', 'Lecture 7: Regression', 'PDF']] },
  { title: 'Week 8', items: [['High', 'Lecture 8: Model evaluation', 'PDF']] },
  { title: 'Week 9', items: [['High', 'Lecture 9: Clustering', 'PDF']] },
  { title: 'Week 10 (non-teaching week)', items: [] },
]
const sections = ['Unit Information', 'Forum', 'Announcements', ...weeks.map(w => w.title), 'Assignments', 'Project', 'Datasets']
const projectParagraphs = ["ICT513 Data Analytics Semester 2, 2026 Project", "Due: Saturday, 31 October 2026, 11:00 PM", "The ICT513 project can be completed in groups of one to three students. You are encouraged to work in pairs or small groups to facilitate discussion, idea sharing, and collaboration through-out the project. Each group must be formed prior to submission, and only one report should be submitted per group. Groups of more than one student must also complete a group evaluation form and include it as the final page of the report (this page is not included in the 10-page limit).", "This project involves a comprehensive data analysis based on one of three provided datasets. Each group is required to select one dataset and develop a short proposal outlining:", "The research questions you aim to investigate,", "The type of analyses you plan to perform,", "The methods you intend to use.", "You are expected to apply at least two distinct analytical methods covered in the unit. One of these methods must be regression, while the second method can be selected based on your research objectives. Each method should be used to address your proposed questions.", "Before analysis, you must clean up and prepare your data set appropriately. You should be ready to begin working on your data during the in-class session on October 20, where you will spend approximately 2–3 hours conducting initial analyzes and obtaining preliminary results. Following this session, you are expected to refine and extend your analysis independently, applying more sophisticated techniques, where appropriate. The final results will be presented in class on October 21.", "After receiving feedback on your presentation, you must submit a written report (maximum 10 pages) via LMS. The report should clearly communicate your objectives, methodology, results, and conclusions in a professional and well-structured format.", "Although this is a data analysis project rather than a full research project, your report should be written in a formal academic style, as if prepared for publication. Diagnostic steps (such as model checking) should be described concisely, and only key results should be presented using well-formatted tables and visualizations.R code should not be included in the main report and must instead be submitted separately as a script file.", "An example report is available on the unit webpage under the “Projects” section to guide your writing.", "Final report", "The report must not exceed 10 pages in length and should include the following sections:", "Introduction: provides background to the research, clearly lays out the research ques-tions of interest, and motivates why these questions are of interest.", "Methods and Analysis: provides a description of the data and the statistical analyses that will be performed. For example if a linear regression is to be carried out, this section should provide an explanation of and motivation for the variables you have included in your model.", "Results: provides a thorough description of the results of the analyses you described in the previous section. This section should first include some carefully chosen descriptive statistics (statistics, tables, data visualizations) that are useful in describing the data and providing a glimpse of what you might expect from your statistical analyses. You must explain what you can derive from these. Then you report the results of your application of statistical techniques; include tables and/or data visualizations with relevant output. If analyzes are carried out that involve the estimation of parameters, this should include an interpretation of the parameters for the variables of interest. Any requirements/as-sumptions needed to perform the analyses carried out must be addressed. In addition, if outliers are present, you may want to determine whether or not the results change by removing these outliers. Finally, remember that even if a result is statistically significant, this does not always mean that it is practically significant.", "Discussion: concisely summarizes your conclusions to the research questions of interest as well as any supplementary analyses carried out. This section also should include a brief description of the limitations of your analyses as well as other research questions that may be worth exploring in response to any exploratory analyses you have carried out.", "R code (not included in the 10 page limit): your R script file, appropriately named and tested. It should be able to be run error-free from start to finish and should include all R code used to produce your results.", "The data (not included in the 10 page limit).", "We take seriously academic integrity, and reports will be closely scrutinised for plagiarism or collusion. If you are unsure of what constitutes plagiarism or collusion, carefully read:", "https://www.murdoch.edu.au/TNE/Student-Information/Academic-Integrity/ If in doubt, you should discuss with the unit coordinator.", "Willingness to Pay for Piped Water", "In many developing countries, access to clean water remains a critical issue for rural communities and small towns, and the Millennium Development Goals aimed to halve the number of people worldwide without access to clean water by 2015. This result was achieved, although the manner in which it was achieved may only provide a short-term fix for some communities and may not provide a sustained improvement in access to clean water. (For example, some communities may have received water infrastructure to obtain clean water, but they may not have appropriate parts, equipment, or people with training to repair the infrastructure if it breaks down.) The new Sustainable Development Goals has set a new target of universal access to clean water by 2030 with a focus on sus-tainability, and many government and aid agency programs that aim to bring clean water to communities now recognise the importance of providing proper training to locals to maintain water infrastructure as well as put in place a supply chain to ensure that needed parts and equipment are available in a reasonable period of time to repair infrastructure.", "One area of sustainability that is still frequently overlooked is economic sustainability. Even with proper training of locals and a supply chain for parts in place, if the community cannot cover the cost of operating and maintaining the water supply infrastructure, then that infrastructure will ultimately be abandoned (unless there is outside intervention). Consequently, an important part of any program that aims to bring new water infrastruc-ture to a community is to understand how much people currently pay for water, how much they say they would be willing to pay for water supplied through a particular form of infrastructure, and whether this amount seems reasonable based on their income. This can help determine whether a proposed form (or forms) of water infrastructure should be economically sustainable for that community.", "As part of this project, we consider data from a project in northern Mozambique that (among other things) assessed how much households would be willing to pay for clean water piped to their yard. One of the towns (Nampula) had widespread availability of piped water, a second (Riba´ue`) had only recently had a piped water system built to ser-vice the town, and a third (Liu´ po) had no piped water facilities. As part of the study, a survey was administered to households using multi-stage cluster sampling where, in each town, a random selection of enumeration areas (or census blocks) was sampled. In-formation obtained from the Mozambican National Statistics Institute would suggest that each enumeration area contains roughly 100 households, and within each enumeration area 15 households were selected using random sampling. For each household sampled, either the head of the household or the spouse of the head of the household was in-terviewed and was queried on a variety of factors meant to establish the type of water source they used, household socioeconomic status, and how much the household would be willing to pay for clean water piped to their yard.", "Data related to household income and expenditure is notoriously difficult to collect with many households unwilling to share this privileged information. To address this issue, it is common to inquire about “proxies” for household income and expenditure which may quite accurately reflect household socioeconomic status without providing a nu-meric measure of household income or expenditure. (For instance, it is common to gauge", "household wealth by asking whether the household owns certain items of various costs.) Certain proxies may prove to be more representative than others in reflecting household income or expenditure, so, where possible, it is advisable to validate proxies against ac-tual income and expenditure data.", "Because those households that choose not to reveal their income or expenditure may be fundamentally different from those that do, it is helpful to get a sense of whether there are distinguishing features of these groups that may help us identify them a priori. This can be useful for surveys carried out using laptops, tablets, or smartphones, as house-holds identified as being unlikely to reveal their household income or expenditure based on answers to previous questions may be asked a different series of questions meant to assess household income and expenditure. (For instance, typical households may be di-rectly asked what their income is, whereas households that may be resistant to provide their exact income may instead be asked whether their income lies within a certain range of values.)", "Initial analysis of data from the survey suggests that those households who do not report household income are also likely to report not being willing to pay for water piped to their premises. One possible explanation for this is that these household may be poor, so they are embarrassed to reveal their income. Because they are poor, they would not be willing to pay for water piped to their home because they do not have expendable income for water. Another possible explanation is that households are suspicious of the intent of the survey, so they may think that their income and how much they report being willing to pay for water piped to their yard may be used to set prices that households would be charged in the future.", "For this project, there are three results of particular interest:", "Given the high level of missing data for household income, many analyses that in-corporate household income may benefit by instead using proxies for income if a good set of proxies can be found for predicting household income. Thus, using those households that do report household income, it is of interest to determine an appropriate set of proxies for predicting household income for these towns.", "Researchers would like to know how a household’s willingness to pay for water piped to their yard relates to their current water source and whether they currently spend money on water. There are several theories about how a household’s current water source may influence how much they would be willing to pay for water piped to their yard:", "If a household does not currently have water piped to their yard or inside their home, they may not know the actual cost and, because they consider it a luxury, may place a higher value on it than what it actually costs. Consequently, they may report being willing to pay more for water piped to their yard than what it truly costs. Those households who have water piped to their yard or inside their home, on the other hand, would report a value that is more in line with actual cost when asked how much they would be willing to pay for water piped to their yard if they did not have their current water source.", "Those who currently have piped water have grown accustomed to the conve-nience of not having to travel for water, so they would be willing to pay a sig-nificant amount to maintain that convenience and would be willing to pay a significant amount for water piped to their yard if they did not have their cur-rent water source. Those who do not have water piped to their yard or inside their home, on the other hand, do not realise just how convenient it is, so are not willing to pay much more than what they currently pay for water.", "The water source currently used by a household reflects household wealth, and the amount a household is willing to pay is determined by their wealth, so households with water piped to their yard or inside their home are wealthier and consequently would be willing to pay more.", "We would like to be able to identify those households that are likely to both not re-port their income and say that they would not be willing to pay for water piped to their yard. Determining factors that might help us identify such households will be useful in creating surveys that adapt the line of questioning used to extract house-hold income as well as how much a household would be willing to pay for wa-ter piped to their yard. If we are able to obtain income or willingness to pay data from these households, it would almost certainly be in the form of a range of val-ues (which would need to be treated as categorical in analyses), which is not as convenient as an exact numeric value for income. However, it is worse to get no in-formation on income or willingness to pay than information that is categorical, and we would roughly equate the relative severity of a false negative (i.e. classifying a household as being likely to report household income and reporting being willing to pay when they in fact will refuse to provide income and will claim to be unwill-ing to pay) to a false positive (i.e. classifying a household as being unlikely to report household income and reporting being unwilling to pay when they in fact would provide their income and would report be willing to pay) as 2 to 1.", "A full list of variables available for analysis is provided in Table 2. Some things to note:", "There are a number of special codes used throughout the dataset. These are de-scribed in Table 1.", "-1\tRespondent refused to answer the question.", "9998\tThe question is not applicable to the respondent. For example, if a respondent specified that they were not willing to pay for a tap in the yard (i.e. INTENTTOPAY", "== 0), then they were not asked how much they would be willing to pay, so", "ACTUALWTP was coded as 9998.", "9999\tThe respondent specifies that he or she does not know.", "NA\tA response was not recorded.", "Table 1: Special codes used in the dataset WTP.csv.", "There are a large number of variables in the dataset. A critical approach should be taken to thinking about the relevance of individual variables to analyses.", "Some variables have high levels of missing data. It is important to think about the implications on your analyses if these variables are included.", "Inclusion of similar variables for each of the respondent, head of household, and/or the spouse of the head of the household could lead to the exclusion of other (poten-tially relevant) variableds. If including variables for more than one of these individ-uals, this must be thought through carefully.", "Can information on the complex sampling design (multi-stage cluster sample) be incorporated in the analysis?", "EA\tEnumeration area (i.e. census block, or cluster)", "HH\tHousehold identifier for a given enumeration area (1 - 15)", "DAY\tDay of interview", "TOWN\tTown (0 = “Nampula”, 1 = “Liu´ po”, = “Riba´ue`”)", "YEARS\tYears household has lived in ăTOWNą", "SEX\tSex of the respondent (0 = “Male”, 1 = “Female”)", "AGE\tAge of the respondent (in years)", "STATUS\tMarital status of the respondent (0 = “Single”, 1 = “Married”, 2 = “Marital union”, 3 = “Divorced”, 4 = “Separated”, 5 = “Widowed”)", "EDUC\tEducation level of the respondent (0 = “None”, 1 = “Primary of the 1st degree”, 2 = “Primary of the 2nd degree”, 3 = “Secondary of the 1st degree”, 4 = “Secondary of the 2nd degree”, 5 = “Higher level”)", "DISABLED\tDisability status of the respondent (0 = “None”, 1 = “Physical”, 2 = “Sight/visual”, 3 = “Other sensory”, 4 = “Mental”)", "HEAD\tIs the respondent the head of the household? (0 = “No”, 1 = “Yes”)", "SEX HH\tSex of the head of the household (0 = “Male”, 1 = “Female”)", "AGE HH\tAge of the head of the household", "STATUS HH\tMarital status of the head of the household EDUC HH\tEducation level of the head of the household DISABLED HH\tDisability status of the head of the household AGE HH SPOUSE\tAge of the spouse of the head of the household", "EDUC HH SPOUSE\tEducation level of the spouse of the head of the household DISABLED HH SPOUSE Disability status of the spouse of the head of the household HH SIZE\tNumber of persons regularly living in the household", "N ADULTS\tNumber of adults regularly living in the household", "PRIMARY WS\tPrimary water source used by household (1 = “Tap in the house”, 2", "= “Tap in the yard”, 3 = “Public tap”, 4 = “Tap of a neighbour”, 5 = “Public borehole”, 6 = “Well”, 7 = “Protected spring”, 8 = “Unpro-tected spring”, 9 = “River, lake, or stream”). These are considered to be hierarchical with 1 considered to be the best type of water source and 9 the worst", "SUFFICIENT WATER  Does the household have sufficient access to water for its daily needs? (0 = “No”, 1 = “Yes”)", "TOTAL TIME\tTotal time required to travel to water source, queue for water and return home when collecting water.", "ACCESSCHANGE  Do you think access to water in your household and community has in-creased, decreased, or remained the same over the past twelve months? (0", "= “Decreased”, 1 = “Increased”, 2 = “Stayed the same”)", "QUALITYCHANGE Do you think the quality of accessible water in your household and com-munity has increased, decreased, or remained the same over the past twelve months? (0 = “Decreased”, 1 = “Increased”, 2 = “Stayed the same”)", "TREAT\tDoes the household treat the water before consuming it? (0 = “No”, 1 = “Always”, 2 = “Sometimes”)", "PAYWATER\tDoes the household pay for water? (0 = “No”, 1 = “Yes”)", "TOTALCOST\tAverage amount (in Mozambican meticals) the household spends each month on water-related costs (including the cost of water, water treatment, transportation of water to the home, etc.)", "ELECTRIC\tIs the household connected to the electrical grid? (0 = “No”, 1 = “Yes”) TOTALINCOME\tAverage total monthly income of the household (in Mozambican meticals) ROOF\tMain material of the roof of the house (0 = “Grass/thatch/palm”, 1 =", "“Zinc sheets”, 2 = “Plates/Lusalite”, 3 = “Tile”, 4 = “Concrete slab”, 5", "= “Other”)", "WALLS\tMain material of the walls of the house (0 = “Bamboo/reed/palmeiras”, 1", "= “Sticks/maticados”, 2 = “Adobe/adobe block”, 3 = “Wooden/zinc”, 4 = “Cement block/brick”, 5 = “Other”)", "LUXURYITEMS1\tDoes the household own (ă1ą = “Radio”, ă2ą = “Television”,", ".\tă3ą = “Mobile phone”, ă4ą = “Other phone”, ă5ą = “Wristwatch”, ă6ą", "= “Bike”, ă7ą = “Motorbike/scooter”, ă8ą =", "LUXURYITEMS8\t“Car/truck”)? (0 = “No”, 1 = “Yes”)", "DIARRHOEA\tDid any member of the household suffer from diarrhoea in the two weeks preceding the interview? (0 = “No”, 1 = “Yes”)", "INTENTTOPAY\tWould the household be willing to pay for a tap in the yard? (0 = “No”, 1", "= “Yes”)", "ACTUALWTP\tHow much would the household be willing to pay (in Mozambican meti-cals) for a tap in the yard?", "TIMELENGTH\tHow long did the survey take to complete (in minutes)?", "Table 2: Descriptions of variables contained in the dataset WTP.csv.", "Dental treatment time", "Some people have dental concerns that require surgical intervention to correct such as an over- or under-bite. The procedures require planning and preparation, the surgery itself, as well as a long period of post surgical treatment. Therefore the total treatment time includes any preparatory work and treatments following surgery (including but not limited to braces and plates).", "This information comes from some research comparing dental treatment between two hospital (one private and one public) for a wide range of dental concerns. Consequently in some groups we have very few individuals and this should be kept in mind and ap-proached appropriately. We have demographic information (age and sex), facial profile before treatment (class I, II or III) and surgical corrections (vertical, transverse, upper jaw, lower jaw, both, extractions and/or other) as well as information about the hospital type and treatment times.", "A complete list of variables is provided on the next page.", "Number\tA patient identifier.", "Agestarttreatment\tThe patient age at the start of the treatment process.", "Sex\tThe patient sex.", "SkeletalAP\tOne of three skeletal classes describing the anteroposterior relation-ship of the jaws. Class I is a normal bite, where the bite is balanced. Class II is where the lower first molar is more towards the back of the mouth than the upper first molar, and the upper front teeth and jaw project further forward than the lower teeth and jaw. Class III is where the lower first molar is more towards the front of the mouth than the upper first molar, and the lower teeth and jaw project fur-ther forward than the upper teeth and jaw.", "Vertical\tIndicates whether a surgical correction was performed to change the vertical alignment.", "Transverse\tIndicates whether a surgical correction was performed to change the transverse alignment.", "Max\tIndicates whether a surgical correction was performed to change the upper jaw (maxilla).", "Mand\tIndicates whether a surgical correction was performed to change the lower jaw (mandible).", "SingleBimax\tIndicates whether single-jaw or double-jaw surgery was performed.", "Exo\tIndicates whether extraction of at least one tooth was also per-formed.", "Other\tIndicates whether some other surgery was also performed.", "Hospital\tIndicates whether treatment was performed at a private or public hospital.", "Treatmenttime\tThe total treatment time in days. Presurgerytime\tThe pre-surgery treatment time in days. Postsurgerytime\tThe post-surgery treatment time in days.", "Table 3: Description of variables in the dataset.", "Breast Cancer Prognosis", "Breast cancer is one of the most common forms of cancer, affecting up to 1 in 7 females in Australia alone. In recent years, advances in detection and treatment of breast cancer have improved survival rates significantly. The average 5-year survival rate for women with invasive breast cancer is 90%, however this drops to only 77% for patients with so-called triple negative breast cancer (patients have tested negative for estrogen and pro-gesterone receptors and excess HER2 protein). Researchers are interested in determining which patients have the more agressive form of cancer and would like to predict patient prognosis (whether or not they will still be alive 5 yrs after initial diagnosis).", "When a patient is diagnosed with breast cancer, clinicians traditionally have collected many clinical and pathological measurements such as tumour grade and stage. In the last 20 years, new biotechnological advances have led to the ability to detect the expression (mRNA) of thousands of genes at the same time using gene expression microarrays. This technology has been used to assess the expression profiles of hundreds of tumours of different types. These profiles can then potentially be used to predict the prognosis of patients.", "In 2002, a group of researchers published a key paper that identified a set of 70 genes whose gene expression (mRNA) levels could predict prognosis in breast cancer patients. This finding was replicated in another study published the New England Journal of Medicine (NEJM) in the same year. The NEJM study by Marc van de Vijver and col-leagues at the Netherlands Cancer Institute profiled (measured) the gene-expression lev-els of genes in breast cancer tumours from 295 women. Traditional criteria that are rou-tinely used to predict a patient’s prognosis, such as the number of lymph nodes that the cancer has spread to and the size of the tumour (in mm), were also measured.", "We will consider data on these 295 individuals who were diagnosed and treated for breast cancer at the Netherlands Cancer Institute. These data include more than 20 variables that reflect the traditional clinico-histopathological characteristics of the patient as well as the gene expression data from their tumours.", "For this project, there are three primary questions to be investigated:", "Gene expression data can be expensive to collect. In the non-research world, this cost must be born by the patient. How well can common clinico-pathological variables help to classify an individual’s chance of being distant metastasis free after 5 years?", "Do the data show a clear link between breast cancer survival and hormone receptor status (ER/PR/HER2)?", "Does combining the traditional variables with the gene expression data improve the ability to predict patient prognosis?", "A full list of variables available for analysis is provided in Table 4.", "Note that variables beginning with “I” represent immunohistochemistry data. The values of these variables are the percentage of positive cells for the relevant gene. The last 105 columns of the dataset contain the gene expression levels of specific genes from the mi-croarray, these are the log (base 2) ratios of the tumor level to normal breast tissue levels. The column names are the relevant genes.", "B01 Profile 70 genes\t70 gene prognosis signature; 0=poor; 1=good (Nature 2002 van ’t Veer, NEJM 2002 van de Vijver)", "E02 Event DMFS 2005\tDistant metastasis as first event(MCR) 2005 1=yes, 0=no", "Cl01 Age\tage at diagnosis", "Cl02 pN pos\tNumber of positive lymph nodes", "Cl03 Size (mm)\tsize of the tumor in mm", "H02A Type2007\tIDC=1; ILC=2; Mucinous=3; Metaplastic=4; tubular.lobular=5; 6=apocrine; 10=IDC/ILC; 8=mucA; 9=mucB; 7=micropapillar", "H03 ANGIOINV2001\tLymphangio invasion data; 0= none, 1= moderate, 2= extensive", "H04 centralcoll\tcentral collegen (0=absent) (1=present)", "H05 matrix\tmatrix formation (0=absent) (1=present)", "H06 necrosis\tnecrosis (0=negative; 1=some; 2=moderate; 3=extensive)", "H08D grade 07\tA tumor with a final sum of Mitoses, nucl pleiomorphy and tubuli formation. 3-5 Grade I (well-differentiated). 6-7 Grade 2; 8-9 Grade", "3 tumor", "H09A lymphinf2005\tlymph infiltration (0=negative; 1=some; 2=moderate; 3=extensive)", "M01B PIK3CA\tmutation (1) or wildtype (0) for the PIK3CA gene", "M02G TP53\tmutation status for TP53 (1=silent/wildtype; 2=missense non-DBM, 3=missense DBM, 4=non-missense)", "I01 ER 2007\tImmunohistochemsitry (IHC) for estrogen receptor alpha", "I02 PR 2007\tImmunohistochemsitry for progesteron PR", "I02B ER/PR clinical\tER/PR Group: 1=ER+/PR+, 2=ER+/PR-, 3=ER-/PR-, 4=ER-/PR+", "I03 HER2 2007\tHER2 IHC 1= positive and 0 = negative", "I06 CMYC 2007\tC-myc antibody", "I11 P53 2007\tP53 % positive", "Table 4: Descriptions of variables contained in the dataset nkiproject.csv.", "Group Evaluation Form", "For those working in pairs the following form must be completed and signed by both group members:", "Student (Student No.) | % Contribution | Signature", "Total | 100% | ", "In most cases, the percentage contributions corresponding to individual group members would be expected to be equal (i.e. 50%), in which case both group members will receive ex-actly the same mark (corresponding to the mark given to the project). Where it is determined that percentage contributions are not equal, individual project marks will be assigned as fol-lows:", "The group member with the highest percentage allocation will receive the mark given to the project.", "The group member with a lower percentage allocation will be given a mark commensu-rate with", "Project mark ˆ \tTheir percentage contribution\t Higher group member percentage allocation", "Where there is disagreement within a group as to appropriate percentage contributions and the group is unable to resolve this disagreement:", "Do not sign the form. (Students who sign the form are considered to be in agreement with the stated percentage allocations.)", "Contact the unit coordinator in regard to the dispute. Those with opposing views on the percentage allocation should explain why they believe a particular percentage allo-cation is warranted, including steps taken to try to ensure that all students had sufficient opportunity for equal contribution to the project."]
const announcements = [{ "title": "Survey", "date": "27 October 2026, 12:04 PM", "paragraphs": ["Hi all,", "Please do the following survey:", "Students can access surveys using this link: http://myfeedback.murdoch.edu.au.", "Many thanks,", "Soudi"] }, { "title": "Week 14", "date": "26 October 2026, 4:00 PM", "paragraphs": ["Hi all,", "Review Session: Tuesday, 27 October from 12:30 PM–2:30 PM in 250.3.023, join face-to-face. We will review the course by solving some questions from previous exams.", "Project Presentation: Wednesday, 28 October at 11:30 to 13:30 in 450.2.001.", "Kind regards,", "Soudi"] }, { "title": "Week 13", "date": "19 October 2026, 11:02 AM", "paragraphs": ["Hi all,", "Tuesday, 20 October at 12:30 PM, please attend in 250.3.023.", "During this session, you will:", "• Work on your project", "• Discuss your project proposal with me", "• Prepare your project and code for the presentation", "Please bring your laptop and be ready to discuss your progress.", "The project presentation contributes 5% out of the total 20% project mark.", "Project Presentation: Wednesday, 21 October, please attend in 450.2.001.", "Each group will have 15 minutes to present their project.", "Regards, Soudi"] }, { "title": "Please do workshop 10", "date": "13 October 2026, 3:15 PM", "paragraphs": ["Hi all,", "Please go through the Workshop 10 PDF available on the LMS.", "Please write the R code provided in the workshop materials by yourself as practice.", "Regards,", "Soudi"] }, { "title": "Week 12", "date": "12 October 2026, 11:56 AM", "paragraphs": ["Hi all,", "Here is what’s coming up for you this week:", "Workshop 10: Tuesday, 13 October at 12:30 PM – attend face-to-face in 250.3.023 or join online via Teams.", "Be ready to participate in the class activity.", "Lab & Tutorial 10: Wednesday, 14 October at 450.2.001.", "For any general questions about lectures, labs, tutorials, or other course matters, please post them on the discussion board or send me an email.", "Kind regards,", "Soudi"] }, { "title": "Project guideline", "date": "9 October 2026, 10:00 AM", "paragraphs": ["Hi all,", "During Week 13, we will use the class time to work on your project. Each group is required to show me their project proposal during class. If any modifications are needed, I will provide feedback and guidance during the session.", "Before coming to class, please follow the stages below to complete your project properly:", "1. Form a Group: Create a group of 1 to 3 students.", "2. Select a Dataset: Choose one dataset from the three datasets available on the LMS.", "3. Understand the Dataset: Identify numerical and categorical variables; perform descriptive statistics and basic exploration.", "Write a Project Proposal: Prepare 4 research questions: 2 for regression analysis and 2 for an additional method. Explain why they are important and what you aim to discover.", "Write the R Code: Start writing the code needed to analyse the data and answer your research questions.", "Explain what you are doing, what you have completed so far, and how you plan to answer your research questions.", "Present Your Project: Prepare and deliver a presentation explaining your project, methods, analysis, and findings.", "Submit the Final Report: Submit a 10-page final report summarising your project, analysis, results, and conclusions.", "You will have one additional week to submit your final report.", "Good luck, Soudi"] }]
const projectGuideline = announcements.find(a => a.title === 'Project guideline')
const announcementItems = announcements.filter(a => a.title !== 'Project guideline')
const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const pageFromPath = () => {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '')
  if (path === '/project') return 'project'
  if (path === '/project/guideline') return 'project-guideline'
  if (path === '/project/assignment') return 'project-assignment'
  if (path === '/announcements') return 'announcements'
  if (path.startsWith('/announcements/')) {
    const match = announcementItems.find(a => slugify(a.title) === path.slice('/announcements/'.length))
    if (match) return 'announcement:' + match.title
  }
  if (path.startsWith('/resources/')) return 'resource:' + decodeURIComponent(path.slice('/resources/'.length))
  return 'course'
}
const pathFromPage = page => {
  if (page === 'course') return '/'
  if (page === 'project') return '/project'
  if (page === 'project-guideline') return '/project/guideline'
  if (page === 'project-assignment') return '/project/assignment'
  if (page === 'announcements') return '/announcements'
  if (page.startsWith('announcement:')) return '/announcements/' + slugify(page.slice(13))
  if (page.startsWith('resource:')) return '/resources/' + encodeURIComponent(page.slice(9))
  return '/'
}
const initialOpen = ['Week 1']
const fonts = ['Arial', 'Inter', 'Abel', 'Georgia', 'Verdana', 'Tahoma', 'OpenDyslexic']

function Icon({ name, size = 19 }) {
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    message: <><path d="M4 4h16v13H9l-5 4z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-8 16-8 16 0" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    font: <><path d="m4 19 8-15 8 15M7 14h10" /></>,
    marker: <><path d="m4 17 10-12 5 5-10 12H4zM14 5l5 5" /></>,
    speech: <><path d="M5 9h4l5-4v14l-5-4H5zM17 8q5 4 0 8" /></>,
    expand: <><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /></>,
    reset: <><path d="M3 11a9 9 0 1 1 3 7M3 4v7h7" /></>,
    play: <path d="m8 5 11 7-11 7z" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    back: <><path d="M6 5v14M19 5 9 12l10 7z" /></>,
    next: <><path d="M18 5v14M5 5l10 7-10 7z" /></>,
    file: <><path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [toolbar, setToolbar] = useState(false)
  const [open, setOpen] = useState(initialOpen)
  const [font, setFont] = useState('Arial')
  const [size, setSize] = useState(16)
  const [textColor, setTextColor] = useState('#111111')
  const [highlightColor, setHighlightColor] = useState('#ffff00')
  const [fontColorOpen, setFontColorOpen] = useState(false)
  const [highlightOpen, setHighlightOpen] = useState(false)
  const closeMenus = () => { setFontColorOpen(false); setHighlightOpen(false) }
  const [focus, setFocus] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [rate, setRate] = useState(1)
  const [completed, setCompleted] = useState([])
  const [activeTab, setActiveTab] = useState('Unit')
  const [page, setPage] = useState(pageFromPath)
  const [announcementSearch, setAnnouncementSearch] = useState('')
  const [notice, setNotice] = useState('')
  const reader = useRef(null)
  const utterance = useRef(null)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  useEffect(() => {
    const handlePopState = () => { stopSpeech(); setPage(pageFromPath()); window.scrollTo(0, 0) }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const toggle = name => setOpen(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name])
  const reset = () => { setFont('Arial'); setSize(16); setTextColor('#111111'); setHighlightColor('#ffff00'); setFocus(false); setOpen(initialOpen); setCompleted([]); setFontColorOpen(false); setHighlightOpen(false); stopSpeech() }
  const stopSpeech = () => { window.speechSynthesis?.cancel(); setSpeaking(false); setPaused(false) }
  const startSpeech = () => {
    if (!('speechSynthesis' in window)) { setNotice('Text-to-speech is not supported in this browser.'); return }
    stopSpeech()
    const text = window.getSelection()?.toString().trim()

    if (!text) {
      setNotice('Please select some text before using Text-to-Speech.')
      return
    }
    const u = new SpeechSynthesisUtterance(text)
    u.rate = rate
    u.onend = () => { setSpeaking(false); setPaused(false) }
    u.onerror = () => { setSpeaking(false); setPaused(false) }
    utterance.current = u
    window.speechSynthesis.speak(u)
    setSpeaking(true)
  }
  const pauseSpeech = () => {
    if (!speaking) { startSpeech(); return }
    if (paused) { window.speechSynthesis.resume(); setPaused(false) }
    else { window.speechSynthesis.pause(); setPaused(true) }
  }
  const changeRate = e => { setRate(Number(e.target.value)); if (speaking) stopSpeech() }
  const jumpTo = name => { if (name === 'Project' || name === 'Announcements') { openPage(name.toLowerCase()); return }; openPage('course'); setActiveTab('Unit'); setOpen(prev => prev.includes(name) ? prev : [...prev, name]); document.getElementById('section-' + sections.indexOf(name))?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const openPage = name => { closeMenus(); stopSpeech(); const path = pathFromPage(name); if (window.location.pathname !== path) window.history.pushState({}, '', path); setPage(name); setLeftOpen(false); window.scrollTo(0, 0) }
  const markDone = id => setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const noticeTimer = useRef(null)

  const placeholder = name => {
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current)
    }

    setNotice(`${name} is a demonstration placeholder. Connect your real LMS resource to activate it.`)

    noticeTimer.current = setTimeout(() => {
      setNotice('')
      noticeTimer.current = null
    }, 3000)
  }
  const [toolbarPosition, setToolbarPosition] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const startToolbarDrag = (e) => {
    if (e.button !== 0) return

    const toolbarElement = e.currentTarget.parentElement
    const rect = toolbarElement.getBoundingClientRect()

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const moveToolbarDrag = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return

    const toolbarElement = e.currentTarget.parentElement
    const width = toolbarElement.offsetWidth
    const height = toolbarElement.offsetHeight

    const x = Math.max(
      0,
      Math.min(window.innerWidth - width, e.clientX - dragOffset.current.x)
    )

    const y = Math.max(
      0,
      Math.min(window.innerHeight - height, e.clientY - dragOffset.current.y)
    )

    setToolbarPosition({ x, y })
  }
  return <div className={`site ${focus ? 'focus-mode' : ''}`}>
    <header className="site-header">
      <div className="brand"><span>My</span> Murdoch Learning</div>
      <nav aria-label="Main navigation"><button onClick={() => placeholder('Dashboard')}>Dashboard</button><button onClick={() => placeholder('My units')}>My units</button><button onClick={() => placeholder('Student help')}>Student help</button></nav>
      <div className="header-icons"><button aria-label="Search" onClick={() => placeholder('Search')}><Icon name="search" /></button><button aria-label="Notifications" onClick={() => placeholder('Notifications')}><Icon name="bell" /></button><button aria-label="Messages" onClick={() => placeholder('Messages')}><Icon name="message" /></button><button aria-label="Profile" onClick={() => placeholder('Profile')}><Icon name="user" /></button></div>
    </header>
    {!focus && <>
      {!leftOpen && (
        <button className="edge-toggle edge-left" aria-label="Open navigation" onClick={() => setLeftOpen(true)}>
          <Icon name="menu" />
        </button>
      )}
      {!rightOpen && (
        <button className="edge-toggle edge-right" aria-label="Open information sidebar" onClick={() => setRightOpen(true)}>
          <Icon name="chevron" />
        </button>
      )}
    </>}
    {!focus && leftOpen && <aside className="left-sidebar" aria-label="Course navigation"><div className="sidebar-top"><strong>Course navigation</strong><button aria-label="Close navigation" onClick={() => setLeftOpen(false)}><Icon name="close" /></button></div>{sections.map(name => <button key={name} className="nav-entry" onClick={() => jumpTo(name)}><Icon name="chevron" size={14} />{name}</button>)}</aside>}
    {!focus && rightOpen && <aside className="right-sidebar" aria-label="Course information"><div className="sidebar-top"><strong>Information</strong><button aria-label="Close information" onClick={() => setRightOpen(false)}><Icon name="close" /></button></div><div className="info-card"><strong>Unit contacts</strong><div className="avatar"><Icon name="user" size={38} /></div><b>Unit contacts name</b></div><div className="info-card"><strong>Class recordings</strong><button className="link-card" onClick={() => placeholder('Class videos and lecture recordings')}>Class videos and lecture recordings <Icon name="chevron" /></button></div><div className="info-card"><strong>Latest announcements</strong><p>Please do workshop7<br /><small>16/09/2026</small></p><p>Week8<br /><small>15/09/2026</small></p><p>Please do workshop6<br /><small>15/09/2026</small></p></div><div className="info-card"><strong>Upcoming events</strong><p>ICT513s2_26: WS WEEK9<br /><small>Tuesday, 22 September</small></p><p>ICT513s2_26: WS WEEK10<br /><small>Tuesday, 22 September</small></p></div><div className="info-card"><strong>Activities</strong><p>Assignments<br />Echo links<br />External tools<br />Forums<br />Resources</p></div></aside>}
    <main className="course-shell" style={{ '--content-font': font === 'OpenDyslexic' ? 'Arial' : font, '--content-size': `${size}px`, '--content-color': textColor }}>
      <div className="course-banner"><h1>ICT513 Data analytics (S2, 2026)</h1></div>
      <div className="course-tabs" role="tablist" aria-label="Course tabs">{['Unit', 'Participants', 'Grades'].map(tab => <button role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div>
      {page !== 'course' ? <div className="welcome content-page" ref={reader}>
        <div className="breadcrumbs"><button onClick={() => openPage('course')}>ICT513 Data Analytics (S2, 2026)</button> / {page === 'project' ? 'Project' : page === 'project-guideline' ? 'Project / Project guideline' : page === 'project-assignment' ? 'Project / ICT513 Data Analytics Semester 2, 2026 Project' : page === 'announcements' ? 'Announcements' : page.startsWith('announcement:') ? 'Announcements / ' + page.slice(13) : page.startsWith('resource:') ? page.slice(9) : page}</div>
        <button className="back-to-course" onClick={() => openPage(page.startsWith('announcement:') ? 'announcements' : (page === 'project-guideline' || page === 'project-assignment') ? 'project' : 'course')}>← {page.startsWith('announcement:') ? 'Back to announcements' : (page === 'project-guideline' || page === 'project-assignment') ? 'Back to Project' : 'Back to unit'}</button>
        {page === 'project' ? <article><h2>Project</h2><div className="project-links"><button className="resource-name" onClick={() => openPage('project-guideline')}>📄 Project guideline</button><button className="resource-name" onClick={() => openPage('project-assignment')}>📄 ICT513 Data Analytics Semester 2, 2026 Project</button></div></article>
          : page === 'project-assignment' ? <article><h2>ICT513 Data Analytics Semester 2, 2026 Project</h2>{projectParagraphs.map((paragraph, i) => <p key={i} className="project-paragraph">{paragraph}</p>)}</article>
          : page === 'project-guideline' ? <article><h2>Project guideline</h2><div className="announcement-post"><p><strong>Project guideline</strong><br /><small>by Soudabeh Shemehsavar – {projectGuideline.date}</small></p>{projectGuideline.paragraphs.map((line, i) => <p key={i}>{line}</p>)}</div></article>
          : page === 'announcements' ? <article><h2>Announcements</h2><p>General news and announcements</p><input className="announcement-search" value={announcementSearch} onChange={e => setAnnouncementSearch(e.target.value)} placeholder="Search forums" aria-label="Search announcements" /><div className="announcement-list">{announcementItems.filter(a => a.title.toLowerCase().includes(announcementSearch.toLowerCase())).map(a => <button key={a.title} onClick={() => openPage('announcement:' + a.title)}><span>☆ &nbsp; {a.title}</span><small>Soudabeh Shemehsavar · {a.date}</small></button>)}</div></article>
            : page.startsWith('announcement:') ? (() => { const a = announcements.find(a => a.title === page.slice(13)); return a ? <article><h2>Announcements</h2><h3>{a.title}</h3><div className="announcement-post"><p><strong>{a.title}</strong><br /><small>by Soudabeh Shemehsavar – {a.date}</small></p>{a.paragraphs.map((line, i) => <p key={i}>{line}</p>)}</div></article> : null })()
              : page.startsWith('resource:') ? <article><h2>{page.slice(9)}</h2><p>This learning material is not available in the current course view.</p></article> : null}
      </div> : activeTab !== 'Unit' ? <div className="tab-placeholder"><h2>{activeTab}</h2><p>This is a visual prototype. No live student data is connected.</p></div> : <>
        <div className="welcome" ref={reader}><p>Welcome to ICT513.<br />Please see the Unit Information to know about the unit in detail.<br />To join the live workshops by Teams, please click on the links provided for.<br />The workshop recordings will be available in the lecture recording section.</p><div className="quick-links"><button onClick={() => openPage('announcements')}><Icon name="message" size={17} /> Announcements</button><button onClick={() => placeholder('Join to Teams link')}><Icon name="message" size={17} /> Join to Teams' link</button></div>
          <div className="expand-actions"><button onClick={() => setOpen(sections)}><Icon name="chevron" size={17} /> Open all</button><button onClick={() => setOpen([])}><span style={{ display: "inline-flex", transform: "rotate(90deg)", verticalAlign: "middle" }}><Icon name="chevron" size={17} /></span> Close all</button></div><p className="hint">Instructions: Clicking on the section name will show / hide the section.</p>
          <div className="accordion">{sections.map((name, index) => { const expanded = open.includes(name); const week = weeks.find(w => w.title === name); return <section key={name} id={`section-${index}`} className="accordion-section"><button className="section-heading" aria-expanded={expanded} onClick={() => toggle(name)}><span className={`arrow ${expanded ? 'down' : ''}`}><Icon name="chevron" size={17} /></span>{name}</button>{expanded && <div className="section-body">{week ? (week.items.length ? week.items.map(([priority, label, type], i) => { const id = `${name}-${i}`; const done = completed.includes(id); return <div className="resource" key={id}><span className={`priority ${priority.toLowerCase()}`}>{priority}</span><Icon name="file" size={15} /><button className="resource-name" onClick={() => openPage('resource:' + label)}>{label}</button><button className={`done-btn ${done ? 'is-done' : ''}`} onClick={() => markDone(id)}>{done ? <><Icon name="check" size={13} /> Done</> : 'Mark as done'}</button></div> }) : <p className="empty">No scheduled activities this week.</p>) : name === 'Project' ? <div className="project-links"><button className="resource-name" onClick={() => openPage('project-guideline')}>📄 Project guideline</button><button className="resource-name" onClick={() => openPage('project')}>📄 ICT513 Data Analytics Semester 2, 2026 Project</button></div> : name === 'Announcements' ? <button className="resource-name" onClick={() => openPage('announcements')}>View announcements →</button> : <p className="empty">{name === 'Unit Information' ? 'ICT513 introduces descriptive statistics, data analysis, visualisation, and practical workshops.' : `No ${name.toLowerCase()} content has been connected to this demonstration.`}</p>}</div>}</section> })}</div>
        </div>
      </>}
    </main>
    <div
      className={`accessibility ${focus ? 'in-focus' : ''} ${toolbarPosition ? 'is-dragged' : ''}`}
      style={toolbarPosition ? {
        left: toolbarPosition.x,
        top: toolbarPosition.y,
        right: 'auto',
        transform: 'none'
      } : undefined}
    >
      {!toolbar ? (
        <button
          className="accessibility-tab"
          aria-label="Open accessibility toolbar"
          onClick={() => { closeMenus(); setToolbar(true) }}
        >
          Accessibility <Icon name="font" size={17} />
        </button>
      ) : (
        <div className="accessibility-bar">
          <button
            type="button"
            className="toolbar-drag-handle"
            title="Drag to move toolbar"
            aria-label="Drag to move accessibility toolbar"
            onPointerDown={startToolbarDrag}
            onPointerMove={moveToolbarDrag}
          >
            ⠿
          </button>

          <label>
            Font type
            <select aria-label="Font type" value={font} onChange={e => { closeMenus(); setFont(e.target.value) }}>
              {fonts.map(f => <option key={f}>{f}</option>)}
            </select>
          </label>

          <label>
            Font size
            <select aria-label="Font size" value={size} onChange={e => { closeMenus(); setSize(Number(e.target.value)) }}>
              {[10, 12, 14, 16, 18, 20, 22, 24, 28].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <div className="color-control">
            <button title="Text colour" aria-label="Text colour" onClick={() => { setFontColorOpen(!fontColorOpen); setHighlightOpen(false) }}>
              <Icon name="font" />
            </button>
            {fontColorOpen && (
              <div className="color-pop">
                <label>Text colour <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} /></label>
                <div className="swatches">
                  {['#111111', '#ff0000', '#0066cc', '#27833b', '#7c3aed'].map(c => (
                    <button key={c} style={{ background: c }} aria-label={`Set text colour ${c}`} onClick={() => { setTextColor(c); setFontColorOpen(false) }} />
                  ))}
                </div>
                <button onClick={() => setTextColor('#111111')}>Reset</button>
              </div>
            )}
          </div>

          <div className="color-control">
            <button title="Highlight colour" aria-label="Highlight colour" onClick={() => { setHighlightOpen(!highlightOpen); setFontColorOpen(false) }}>
              <Icon name="marker" />
            </button>
            {highlightOpen && (
              <div className="color-pop">
                <label>Highlight colour <input type="color" value={highlightColor} onChange={e => setHighlightColor(e.target.value)} /></label>
                <div className="swatches">
                  {['#ffff00', '#b4f0e7', '#ffd6d6', '#d8d2ff', '#ffffff'].map(c => (
                    <button key={c} style={{ background: c }} aria-label={`Set highlight colour ${c}`} onClick={() => { setHighlightColor(c); setHighlightOpen(false) }} />
                  ))}
                </div>
                <button onClick={() => setHighlightColor('#ffff00')}>Reset</button>
              </div>
            )}
          </div>

          <button title="Read selected text" aria-label="Read selected text" onClick={() => { closeMenus(); startSpeech() }}>
            <Icon name="speech" />
          </button>
          <button title="Focus mode" aria-label="Toggle focus mode" onClick={() => { closeMenus(); stopSpeech(); setFocus(!focus); setLeftOpen(false); setRightOpen(false) }}>
            <Icon name="expand" />
          </button>
          <button title="Reset settings" aria-label="Reset settings" onClick={reset}>
            <Icon name="reset" />
          </button>
          <button title="Close toolbar" aria-label="Close toolbar" onClick={() => { closeMenus(); stopSpeech(); setToolbar(false) }}>
            <Icon name="close" />
          </button>
        </div>
      )}
      {toolbar && speaking && <div className="speech-panel"><span>Read selected text</span><button title="Restart" onClick={startSpeech}><Icon name="back" /></button><button title={paused ? 'Resume' : 'Pause'} onClick={pauseSpeech}><Icon name={paused ? 'play' : 'pause'} /></button><button title="Stop" onClick={stopSpeech}><Icon name="next" /></button><label>Speed: <select value={rate} onChange={changeRate}><option value="0.7">Slow</option><option value="1">Medium</option><option value="1.3">Fast</option></select></label></div>}
    </div>
    {notice && <div className="notice" role="status">{notice}<button aria-label="Dismiss" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}
    <style>{`.welcome ::selection { background: ${highlightColor}; color: ${textColor}; }`}</style>
  </div>
}
