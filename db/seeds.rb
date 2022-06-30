# require 'faker'
User.all.destroy_all
Team.all.destroy_all
Project.all.destroy_all


profile_img = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsKE0n1Wa70pdYeKKIiJonNcU-fuNEV0nuw&usqp=CAU',
  'https://i.pinimg.com/originals/f6/a6/ee/f6a6ee3f5c366950db6012a0d44cc882.jpg',
  'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-girl-images.jpg',
  'https://i.pinimg.com/280x280_RS/b9/48/40/b94840cc58a8e70897332f43fe1b87ea.jpg',
  'https://i.pinimg.com/originals/88/ef/67/88ef67806917a52364093c17a28f1590.png'
]

5.times do |i|

  name = Faker::Name.first_name

  User.create(
              name: Faker::Name.first_name,
              username: "#{name.downcase}#{i}",
              password: Faker::Internet.password,
              email: Faker::Internet.email,
              profile_img: profile_img[i] ,
             ) 
end

3.times do |i|

  Team.create(
              name: Faker::Music::RockBand.name,
             ) 
end


10.times do |i|

  Project.create(
              title: Faker::Ancient.hero,
              description: Faker::Hipster.paragraph(sentence_count: 3),
              whiteboard: Faker::LoremPixel.image(size: "50x60"),
              user_id: rand(1..5),
              team_id: rand(1..3)

             ) 
end


puts ("yay! done seeding 🌸")