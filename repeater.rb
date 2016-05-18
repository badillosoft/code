##
# 
# Alan Badillo Salas
# badillo.soft@hotmail.com
# https://github.com/badillosoft/code
# 
# Create at: 17-05-2016
# Version: 1.0.0
# 
# Repite fragmentos de texto y los guarda en un archivo
#  variando parámetros mediante una función
# 
##

class Repeater
   
#    attr_accessor :filename
   
   def initialize(options)
    @filename = "out.txt"
    @debug = false
   
    options.each do |k, v|
        self.class.module_eval { attr_accessor k }
        self.send("#{k}=", v)
    end
   end
   
   def for(a, b, inc = 1)
    if @debug
        puts "Creating file: #{@filename}"
    end
   
    file = File.new(@filename, "w")
    
    a.step(b, inc) do |i|
        aux = yield i
        
        if @debug
            puts "Writing: #{aux}"
        end
        
        file << aux
    end
    
    if @debug
        puts "Closing file: #{@filename}"
    end
    
    file.close
   end
    
end