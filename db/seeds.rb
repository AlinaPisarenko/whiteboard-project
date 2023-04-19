require 'faker'
User.all.destroy_all
Team.all.destroy_all
Project.all.destroy_all
Review.all.destroy_all


# profile_img = [
#   'https://www.meme-arsenal.com/memes/6aa877040faa1fe6550b071d5c7a893d.jpg',
#   'https://i.pinimg.com/originals/74/1d/fc/741dfc324063848736987515f4bfbbbb.jpg',
#   'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-girl-images.jpg',
#   'https://i.pinimg.com/originals/e1/b6/68/e1b6681034f0577901711a851e635939.jpg',
#   'https://i.pinimg.com/originals/88/ef/67/88ef67806917a52364093c17a28f1590.png',
#   'https://i.pinimg.com/1200x/42/c6/22/42c62228dc68879dd3c93eec1393b6f9.jpg',
#   'https://i.pinimg.com/originals/7e/2f/ab/7e2fab8ead25c33f28c820b5e064c881.jpg',
#   'https://i.pinimg.com/originals/a1/25/17/a12517ef47ab42a8e1a71a826cd833f7.jpg',
#   'https://i.pinimg.com/originals/ee/66/41/ee66418c7f31a03a78ab0bae691fed65.jpg',
#   'https://i.pinimg.com/474x/9d/eb/8a/9deb8af357b75f68540eb2432dc94eff.jpg',
#   'https://i.pinimg.com/236x/c4/04/78/c404780e997ca8a1da13a279818f40a0.jpg',
#   'https://i.pinimg.com/736x/62/56/16/6256166d8afc94248213d1c126995d05.jpg',
#   'https://cdn140.picsart.com/301861356010201.jpg',
#   'https://i.pinimg.com/736x/44/4a/a5/444aa5ca63ba8ddae10e178bb22581eb.jpg',
#   'https://pbs.twimg.com/media/E3C74VSWYAEMnth.jpg',
#   'https://paintology.com/wp-content/uploads/2020/05/Dollify-eba31795-81fd-4ec8-8cce-4a2b3552a878-0.png',
# 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/cqli186hjbvltzls3tae/make-your-cool-dollify-avatars-your-own-cartoon-character.png'

# ]

# 5.times do |i|

#   name = Faker::Name.first_name

#   User.create(
#               name: Faker::Name.first_name,
#               username: "#{name.downcase}#{i}",
#               password: Faker::Internet.password,
#               email: Faker::Internet.email,
#               profile_img: profile_img[i] ,
#              ) 
# end

5.times do |i|

  Team.create(
              name: Faker::Music::RockBand.name,
             ) 
end


# 10.times do |i|

#   Project.create(
#               title: Faker::Ancient.hero,
#               description: Faker::Hipster.paragraph(sentence_count: 3),
#               whiteboard: Faker::LoremPixel.image(size: "50x60"),
#               user_id: rand(1..5),
#               team_id: rand(1..3)

#              ) 
# end


puts ("yay! done seeding 🌸")