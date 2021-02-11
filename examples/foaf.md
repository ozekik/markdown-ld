# Friend of a Friend (FOAF) Core

`<http://xmlns.com/foaf/0.1/>`

```
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl:  <http://www.w3.org/2002/07/owl#> .
@prefix vs:  <http://www.w3.org/2003/06/sw-vocab-status/ns#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
@prefix wot:  <http://xmlns.com/wot/0.1/> .
@prefix dc:  <http://purl.org/dc/elements/1.1/> .

foaf:   rdf:type        owl:Ontology ;
        dc:title        "Friend of a Friend (FOAF) vocabulary" ;
        dc:description  "The Friend of a Friend (FOAF) RDF vocabulary, described using W3C RDF Schema and the Web Ontology Language." .
```

The Friend of a Friend (FOAF) RDF vocabulary, described using W3C RDF Schema and the Web Ontology Language.

[The original specification](http://xmlns.com/foaf/spec/) is licensed under [CC BY-1.0](http://creativecommons.org/licenses/by/1.0/).

#### Contents

- [Agent](#agent)
- [Person](#person)
- [name](#name)
- [title](#title)
- [img](#img)
- [depiction](#depiction)
- [family name](#family-name)
- [given name](#given-name)
- [knows](#knows)
- [based near](#based-near)
- [age](#age)
- [made](#made)
- [primary topic](#primary-topic)
- [Project](#project)
- [Organization](#organization)
- [Group](#group)
- [member](#member)
- [Document](#document)
- [Image](#image)

## Agent

`foaf:Agent`

```
foaf:Agent  rdf:type         rdfs:Class ;
        vs:term_status       "stable" ;
        rdfs:label           "Agent" ;
        rdfs:comment         "An agent (eg. person, group, software or physical artifact)." ;
        rdf:type             owl:Class .
```

The Agent class is the class of agents; things that do stuff. A well known sub-class is Person, representing people. Other kinds of agents include Organization and Group.

The Agent class is useful in a few places in FOAF where Person would have been overly specific. For example, the IM chat ID properties such as jabberID are typically associated with people, but sometimes belong to software bots.

### equivalent class

`owl:equivalentClass`

- Agent `<http://purl.org/dc/terms/Agent>`

## Person

`foaf:Person`

```
foaf:Person  rdf:type        rdfs:Class ;
        rdfs:label           "Person" ;
        rdfs:comment         "A person." ;
        vs:term_status       "stable" ;
        rdf:type             owl:Class ;
        rdfs:isDefinedBy     foaf: .
```

The Person class represents people. Something is a Person if it is a person. We don't nitpic about whether they're alive, dead, real, or imaginary. The Person class is a sub-class of the Agent class, since all people are considered 'agents' in FOAF.

### sub-class of

`rdfs:subClassOf`

- [Agent](#agent) `foaf:Agent`

### equivalent classes

`owl:equivalentClass`

- Person `<http://schema.org/Person>`
- Person `<http://www.w3.org/2000/10/swap/pim/contact#Person>`

### disjoint with

`owl:disjointWith`

- [Organization](#organization) `foaf:Organization`
- [Project](#project) `foaf:Project`

## name

`foaf:name`

```
foaf:name  rdf:type         rdf:Property ;
        vs:term_status      "testing" ;
        rdfs:label          "name" ;
        rdfs:comment        "A name for some thing." ;
        rdf:type            owl:DatatypeProperty ;
        rdfs:isDefinedBy    foaf: .
```

FOAF provides some other naming constructs. While foaf:name does not explicitly represent name substructure (family vs given etc.) it does provide a basic level of interoperability. See the issue tracker for status of work on this issue.

The name property, like all RDF properties with a range of rdfs:Literal, may be used with XMLLiteral datatyped values (multiple names are acceptable whether they are in the same langauge or not). XMLLiteral usage is not yet widely adopted. Feedback on this aspect of the FOAF design is particularly welcomed.

### sub-property of

`rdfs:subPropertyOf`

- Label `rdfs:label`

### domain

`rdfs:domain`

- Thing `owl:Thing`

### range

`rdfs:range`

- Literal `rdfs:Literal`

## title

`foaf:title`

```
foaf:title  rdf:type      rdf:Property ;
        vs:term_status    "testing" ;
        rdfs:label        "title" ;
        rdfs:comment      "Title (Mr, Mrs, Ms, Dr. etc)" ;
        rdf:type          owl:DatatypeProperty ;
        rdfs:isDefinedBy  foaf: .
```
The approriate values for title are not formally constrained, and will vary across community and context. Values such as 'Mr', 'Mrs', 'Ms', 'Dr' etc. are expected.

## img

`foaf:img`

```
foaf:img  rdf:type          rdf:Property ;
        vs:term_status      "testing" ;
        rdfs:label          "image" ;
        rdfs:comment        "An image that can be used to represent some thing (ie. those depictions which are particularly representative of something, eg. one's photo on a homepage)." ;
        rdf:type            owl:ObjectProperty ;
        rdfs:isDefinedBy    foaf: .
```

The img property relates a Person to a Image that represents them. Unlike its super-property depiction, we only use img when an image is particularly representative of some person. The analogy is with the image(s) that might appear on someone's homepage, rather than happen to appear somewhere in their photo album.

Unlike the more general depiction property (and its inverse, depicts), the img property is only used with representations of people (ie. instances of Person). So you can't use it to find pictures of cats, dogs etc. The basic idea is to have a term whose use is more restricted than depiction so we can have a useful way of picking out a reasonable image to represent someone. FOAF defines img as a sub-property of depiction, which means that the latter relationship is implied whenever two things are related by the former.

Note that img does not have any restrictions on the dimensions, colour depth, format etc of the Image it references.

Terminology: note that img is a property (ie. relationship), and that code:Image is a similarly named class (ie. category, a type of thing). It might have been more helpful to call img 'mugshot' or similar; instead it is named by analogy to the HTML IMG element.

### sub-property of

`rdfs:subPropertyOf`

- [Depiction](#depiction) `foaf:depiction`

### domain

`rdfs:domain`

- [Person](#person) `foaf:Person`

### range

`rdfs:range`

- [Image](#image) `foaf:Image`

## depiction

`foaf:depiction`

```
foaf:depiction  rdf:type  rdf:Property ;
        vs:term_status    "testing" ;
        rdfs:label        "depiction" ;
        rdfs:comment      "A depiction of some thing." ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The depiction property is a relationship between a thing and an Image that depicts it. As such it is an inverse of the depicts relationship.

A common use of depiction (and depicts) is to indicate the contents of a digital image, for example the people or objects represented in an online photo gallery.

Extensions to this basic idea include 'Co-Depiction' (social networks as evidenced in photos), as well as richer photo metadata through the mechanism of using SVG paths to indicate the regions of an image which depict some particular thing. See 'Annotating Images With SVG' for tools and details.

The basic notion of 'depiction' could also be extended to deal with multimedia content (video clips, audio), or refined to deal with corner cases, such as pictures of pictures etc.

The depiction property is a super-property of the more specific property img, which is used more sparingly. You stand in a depiction relation to any Image that depicts you, whereas img is typically used to indicate a few images that are particularly representative.

### domain

`rdfs:domain`

- Thing `owl:Thing`

### range

`rdfs:range`

- [Image](#image) `foaf:Image`

### inverse of

`owl:inverseOf`

- [depicts](#depicts) `foaf:depicts`

## family name

`foaf:familyName`

```
foaf:familyName  rdf:type  rdf:Property ;
        vs:term_status    "testing" ;
        rdfs:label        "familyName" ;
        rdfs:comment      "The family name of some person." ;
        rdf:type          owl:DatatypeProperty ;
        rdfs:isDefinedBy  foaf: .
```

The familyName property is provided (alongside givenName) for use when describing parts of people's names. Although these concepts do not capture the full range of personal naming styles found world-wide, they are commonly used and have some value.

There is also a simple name property.

Support is also provided for the more archaic and culturally varying terminology of firstName and lastName.

See the issue tracker for design discussions, status and ongoing work on rationalising the FOAF naming machinery.

### domain

`rdfs:domain`

- [Person](#person) `foaf:Person`

### range

`rdfs:range`

- Literal `rdfs:Literal`

## given name

`foaf:givenName`

```
foaf:givenName  rdf:type  rdf:Property ;
        vs:term_status    "testing" ;
        rdfs:label        "Given name" ;
        rdfs:comment      "The given name of some person." ;
        rdf:type          owl:DatatypeProperty ;
        rdfs:isDefinedBy  foaf: .
```

The givenName property is provided (alongside familyName) for use when describing parts of people's names. Although these concepts do not capture the full range of personal naming styles found world-wide, they are commonly used and have some value.

There is also a simple name property.

Support is also provided for the more archaic and culturally varying terminology of firstName and lastName.

See the issue tracker for design discussions, status and ongoing work on rationalising the FOAF naming machinery.

## knows

`foaf:knows`

```
foaf:knows  rdf:type      rdf:Property ;
        vs:term_status    "stable" ;
        rdfs:label        "knows" ;
        rdfs:comment      "A person known by this person (indicating some level of reciprocated interaction between the parties)." ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The knows property relates a Person to another Person that he or she knows.

We take a broad view of 'knows', but do require some form of reciprocated interaction (ie. stalkers need not apply). Since social attitudes and conventions on this topic vary greatly between communities, counties and cultures, it is not appropriate for FOAF to be overly-specific here.

If someone knows a person, it would be usual for the relation to be reciprocated. However this doesn't mean that there is any obligation for either party to publish FOAF describing this relationship. A knows relationship does not imply friendship, endorsement, or that a face-to-face meeting has taken place: phone, fax, email, and smoke signals are all perfectly acceptable ways of communicating with people you know.

You probably know hundreds of people, yet might only list a few in your public FOAF file. That's OK. Or you might list them all. It is perfectly fine to have a FOAF file and not list anyone else in it at all. This illustrates the Semantic Web principle of partial description: RDF documents rarely describe the entire picture. There is always more to be said, more information living elsewhere in the Web (or in our heads...).

Since knows is vague by design, it may be suprising that it has uses. Typically these involve combining other RDF properties. For example, an application might look at properties of each weblog that was made by someone you "knows". Or check the newsfeed of the online photo archive for each of these people, to show you recent photos taken by people you know.

To provide additional levels of representation beyond mere 'knows', FOAF applications can do several things.

They can use more precise relationships than knows to relate people to people. The original FOAF design included two of these ('knowsWell','friend') which we removed because they were somewhat awkward to actually use, bringing an inappopriate air of precision to an intrinsically vague concept. Other extensions have been proposed, including Eric Vitiello's Relationship module for FOAF.

In addition to using more specialised inter-personal relationship types (eg rel:acquaintanceOf etc) it is often just as good to use RDF descriptions of the states of affairs which imply particular kinds of relationship. So for example, two people who have the same value for their workplaceHomepage property are typically colleagues. We don't (currently) clutter FOAF up with these extra relationships, but the facts can be written in FOAF nevertheless. Similarly, if there exists a Document that has two people listed as its makers, then they are probably collaborators of some kind. Or if two people appear in 100s of digital photos together, there's a good chance they're friends and/or colleagues.

So FOAF is quite pluralistic in its approach to representing relationships between people. FOAF is built on top of a general purpose machine language for representing relationships (ie. RDF), so is quite capable of representing any kinds of relationship we care to add. The problems are generally social rather than technical; deciding on appropriate ways of describing these interconnections is a subtle art.

Perhaps the most important use of knows is, alongside the rdfs:seeAlso property, to connect FOAF files together. Taken alone, a FOAF file is somewhat dull. But linked in with 1000s of other FOAF files it becomes more interesting, with each FOAF file saying a little more about people, places, documents, things... By mentioning other people (via knows or other relationships), and by providing an rdfs:seeAlso link to their FOAF file, you can make it easy for FOAF indexing tools ('scutters') to find your FOAF and the FOAF of the people you've mentioned. And the FOAF of the people they mention, and so on. This makes it possible to build FOAF aggregators without the need for a centrally managed directory of FOAF files...

### domain

`rdfs:domain`

- [Person](#person) `foaf:Person`

### range

`rdfs:range`

- [Person](#person) `foaf:Person`

## based near

`foaf:based_near`

```
foaf:based_near  rdf:type  rdf:Property ;
        vs:term_status    "testing" ;
        rdfs:label        "based near" ;
        rdfs:comment      "A location that something is based near, for some broadly human notion of near." ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The based_near relationship relates two "spatial things" (anything that can be somewhere), the latter typically described using the geo:lat / geo:long geo-positioning vocabulary (See GeoInfo in the W3C semweb wiki for details). This allows us to say describe the typical latitute and longitude of, say, a Person (people are spatial things - they can be places) without implying that a precise location has been given.

We do not say much about what 'near' means in this context; it is a 'rough and ready' concept. For a more precise treatment, see GeoOnion vocab design discussions, which are aiming to produce a more sophisticated vocabulary for such purposes.

FOAF files often make use of the contact:nearestAirport property. This illustrates the distinction between FOAF documents (which may make claims using any RDF vocabulary) and the core FOAF vocabulary defined by this specification. For further reading on the use of nearestAirport see UsingContactNearestAirport in the FOAF wiki.

### domain

`rdfs:domain`

- Spatial Thing `<http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing>`

### range

`rdfs:range`

- Spatial Thing `<http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing>`

## age

`foaf:age`

```
foaf:age  rdf:type        rdf:Property ;
        vs:term_status    "unstable" ;
        rdfs:label        "age" ;
        rdfs:comment      "The age in years of some agent." ;
        rdf:type          owl:FunctionalProperty ;
        rdf:type          owl:DatatypeProperty ;
        rdfs:isDefinedBy  foaf: .
```

The age property is a relationship between a Agent and an integer string representing their age in years. See also birthday.

### domain

`rdfs:domain`

- [Agent](#agent) `foaf:Agent`

### range

`rdfs:range`

- Literal `rdfs:Literal`

## made

`foaf:made`

```
foaf:made  rdf:type       rdf:Property ;
        vs:term_status    "stable" ;
        rdfs:label        "made" ;
        rdfs:comment      "Something that was made by this agent." ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The made property relates a Agent to something made by it. As such it is an inverse of the maker property, which relates a thing to something that made it. See made for more details on the relationship between these FOAF terms and related Dublin Core vocabulary.

### domain

`rdfs:domain`

- [Agent](#agent) `foaf:Agent`

### range

`rdfs:range`

- Thing `owl:Thing`

### inverse of

`owl:inverseOf`

- [maker](#maker) `foaf:maker`

## primary topic

`foaf:primaryTopic`

```
foaf:primaryTopic  rdf:type  rdf:Property ;
        vs:term_status    "stable" ;
        rdfs:label        "primary topic" ;
        rdfs:comment      "The primary topic of some page or document." ;
        rdf:type          owl:FunctionalProperty ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The primaryTopic property relates a document to the main thing that the document is about.

The primaryTopic property is functional: for any document it applies to, it can have at most one value. This is useful, as it allows for data merging. In many cases it may be difficult for third parties to determine the primary topic of a document, but in a useful number of cases (eg. descriptions of movies, restaurants, politicians, ...) it should be reasonably obvious. Documents are very often the most authoritative source of information about their own primary topics, although this cannot be guaranteed since documents cannot be assumed to be accurate, honest etc.

It is an inverse of the isPrimaryTopicOf property, which relates a thing to a document primarily about that thing. The choice between these two properties is purely pragmatic. When describing documents, we use primaryTopic former to point to the things they're about. When describing things (people etc.), it is useful to be able to directly cite documents which have those things as their main topic - so we use isPrimaryTopicOf. In this way, Web sites such as Wikipedia or NNDB can provide indirect identification for the things they have descriptions of.

### domain

`rdfs:domain`

- [Document](#document) `foaf:Document`

### range

`rdfs:range`

- Thing `owl:Thing`

### inverse of

`owl:inverseOf`

- [is primary topic of](#is-primary-topic-of) `foaf:isPrimaryTopicOf`

## Project

`foaf:Project`

```
foaf:Project  rdf:type    rdfs:Class ;
        vs:term_status    "testing" ;
        rdfs:label        "Project" ;
        rdfs:comment      "A project (a collective endeavour of some kind)." ;
        rdf:type          owl:Class ;
        rdfs:isDefinedBy  foaf: .
```

The Project class represents the class of things that are 'projects'. These may be formal or informal, collective or individual. It is often useful to indicate the homepage of a Project.

### disjoint with

`owl:disjointWith`

- [Person](#person) `foaf:Person`
- [Document](#document) `foaf:Document`

## Organization

`foaf:Organization`

```
foaf:Organization  rdf:type  rdfs:Class ;
        rdfs:label        "Organization" ;
        rdfs:comment      "An organization." ;
        vs:term_status    "stable" ;
        rdf:type          owl:Class ;
        rdfs:isDefinedBy  foaf: .
```

The Organization class represents a kind of Agent corresponding to social instititutions such as companies, societies etc.

### sub-class of

`rdfs:subClassOf`

- [Agent](#agent) `foaf:Agent`

### disjoint with

`owl:disjointWith`

- [Person](#person) `foaf:Person`
- [Document](#document) `foaf:Document`

## Group

`foaf:Group`

```
foaf:Group  rdf:type     rdfs:Class ;
        vs:term_status   "stable" ;
        rdfs:label       "Group" ;
        rdfs:comment     "A class of Agents." ;
        rdf:type         owl:Class .
```

The Group class represents a collection of individual agents (and may itself play the role of a Agent, ie. something that can perform actions).

This concept is intentionally quite broad, covering informal and ad-hoc groups, long-lived communities, organizational groups within a workplace, etc. Some such groups may have associated characteristics which could be captured in RDF (perhaps a homepage, name, mailing list etc.).

While a Group has the characteristics of a Agent, it is also associated with a number of other Agents (typically people) who constitute the Group. FOAF provides a mechanism, the membershipClass property, which relates a Group to a sub-class of the class Agent who are members of the group. This is a little complicated, but allows us to make group membership rules explicit.

The markup (shown below) for defining a group is both complex and powerful. It allows group membership rules to match against any RDF-describable characteristics of the potential group members. As FOAF and similar vocabularies become more expressive in their ability to describe individuals, the Group mechanism for categorising them into groups also becomes more powerful.

While the formal description of membership criteria for a Group may be complex, the basic mechanism for saying that someone is in a Group is very simple. We simply use a member property of the Group to indicate the agents that are members of the group. For example:

```xml
<foaf:Group>
 <foaf:name>ILRT staff</foaf:name>
 <foaf:member>
  <foaf:Person>
   <foaf:name>Martin Poulter</foaf:name>
   <foaf:homepage rdf:resource="http://www.ilrt.bris.ac.uk/aboutus/staff/staffprofile/?search=plmlp"/>
   <foaf:workplaceHomepage rdf:resource="http://www.ilrt.bris.ac.uk/"/>
  </foaf:Person>
 </foaf:member>
</foaf:Group>
```

Behind the scenes, further RDF statements can be used to express the rules for being a member of this group. End-users of FOAF need not pay attention to these details.

Here is an example. We define a Group representing those people who are ILRT staff members (ILRT is a department at the University of Bristol). The membershipClass property connects the group (conceived of as a social entity and agent in its own right) with the class definition for those people who constitute it. In this case, the rule is that all group members are in the ILRTStaffPerson class, which is in turn populated by all those things that are a Person and which have a workplaceHomepage of http://www.ilrt.bris.ac.uk/. This is typical: FOAF groups are created by specifying a sub-class of Agent (in fact usually this will be a sub-class of Person), and giving criteria for which things fall in or out of the sub-class. For this, we use the owl:onProperty and owl:hasValue properties, indicating the property/value pairs which must be true of matching agents.

```xml
<!-- here we see a FOAF group described.
     each foaf group may be associated with an OWL definition
     specifying the class of agents that constitute the group's membership -->
<foaf:Group>
 <foaf:name>ILRT staff</foaf:name>
 <foaf:membershipClass>
    <owl:Class rdf:about="http://ilrt.example.com/groups#ILRTStaffPerson">
     <rdfs:subClassOf rdf:resource="http://xmlns.com/foaf/0.1/Person"/>
     <rdfs:subClassOf>
       <owl:Restriction>
         <owl:onProperty rdf:resource="http://xmlns.com/foaf/0.1/workplaceHomepage"/>
         <owl:hasValue rdf:resource="http://www.ilrt.bris.ac.uk/"/>
       </owl:Restriction>
     </rdfs:subClassOf>
   </owl:Class>
 </foaf:membershipClass>
</foaf:Group>
```

Note that while these example OWL rules for being in the eg:ILRTStaffPerson class are based on a Person having a particular workplaceHomepage, this places no obligations on the authors of actual FOAF documents to include this information. If the information is included, then generic OWL tools may infer that some person is an eg:ILRTStaffPerson. To go the extra step and infer that some eg:ILRTStaffPerson is a member of the group whose name is "ILRT staff", tools will need some knowledge of the way FOAF deals with groups. In other words, generic OWL technology gets us most of the way, but the full Group machinery requires extra work for implimentors.

The current design names the relationship as pointing from the group, to the member. This is convenient when writing XML/RDF that encloses the members within markup that describes the group. Alternate representations of the same content are allowed in RDF, so you can write claims about the Person and the Group without having to nest either description inside the other. For (brief) example:

```xml
<foaf:Group>
 <foaf:member rdf:nodeID="martin"/>
 <!-- more about the group here -->
</foaf:Group>
<foaf:Person rdf:nodeID="martin">
  <!-- more about martin here -->
</foaf:Person>
```

There is a FOAF issue tracker associated with this FOAF term. A design goal is to make the most of W3C's OWL language for representing group-membership criteria, while also making it easy to leverage existing groups and datasets available online (eg. buddylists, mailing list membership lists etc). Feedback on the current design is solicited! Should we consider using SPARQL queries instead, for example?

### sub-class of

`rdfs:subClassOf`

- [Agent](#agent) `foaf:Agent`

## member

`foaf:member`

```
foaf:member  rdf:type     rdf:Property ;
        vs:term_status    "stable" ;
        rdfs:label        "member" ;
        rdfs:comment      "Indicates a member of a Group" ;
        rdf:type          owl:ObjectProperty ;
        rdfs:isDefinedBy  foaf: .
```

The member property relates a Group to a Agent that is a member of that group.

See Group for details and examples.

### domain

`rdfs:domain`

- [Group](#group) `foaf:Group`

### range

`rdfs:range`

- [Agent](#agent) `foaf:Agent`

## Document

`foaf:Document`

```
foaf:Document  rdf:type      rdfs:Class ;
        rdfs:label           "Document" ;
        rdfs:comment         "A document." ;
        vs:term_status       "stable" ;
        rdf:type             owl:Class ;
        rdfs:isDefinedBy     foaf: .
```

The Document class represents those things which are, broadly conceived, 'documents'.

The Image class is a sub-class of Document, since all images are documents.

### equivalent class

`owl:equivalentClass`

- Creative Work `<http://schema.org/CreativeWork>`

### disjoint with

`owl:disjointWith`

- [Organization](#organization) `foaf:Organization`
- [Project](#project) `foaf:Project`

## Image

`foaf:Image`

```
foaf:Image  rdf:type         rdfs:Class ;
        vs:term_status       "stable" ;
        rdfs:label           "Image" ;
        rdfs:comment         "An image." ;
        rdf:type             owl:Class ;
        rdfs:isDefinedBy  foaf: .
```

The class Image is a sub-class of Document corresponding to those documents which are images.

Digital images (such as JPEG, PNG, GIF bitmaps, SVG diagrams etc.) are examples of Image.

### sub-class of

`rdfs:subClassOf`

- [Document](#document) `foaf:Document`

### equivalent class

`owl:equivalentClass`

- Image Object `<http://schema.org/ImageObject>`
